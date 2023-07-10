class Api::GroupsController < ApplicationController
  before_action :require_logged_in, only: [:create]

  def join
    @group = Group.find(params[:id])
    if @group.members.exists?(current_user.id)
      render json: { error: "Already a member for this group" }, status: 422
    else
      @group.members << current_user
      render :show
    end
  end

  def leave
    @group = Group.find(params[:id])
    if @group.members.exists?(current_user.id)
      @group.members.delete(current_user)
      render :show
    else
      render json: { error: "Not a member of this group" }, status: 422
    end
  end

  def index 
    @groups = Group.all
    render :index
  end

  def show
    @group = Group.find(params[:id])
    render :show
  end

  def update
    # @group = Group.find(params[:id])
    # @membership = @group.memberships
    # if (@group.owner_id == current_user.id)

    # end
    @group = Group.find(params[:id])
        if (@group.owner.id == current_user.id) 
          if @group.update(group_params)
            render :show 
          else
              render json: {errors: @group.errors.full_messages}, status: 422 
          end
        else
          render json: {errors: ["Not the creator/Group not found"]}
        end
    end

  def create
    @group = Group.new(group_params)
    @group.owner = current_user
    # debugger
    if (@group.save)
      membership = Membership.new(member_id: current_user, group_id: @group.id)
      membership.save
      render :show
    else 
      render json: {errors: @group.errors.full_messages}, status: 422  
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.delete if @group.owner_id == current_user.id
    # render :index
    head :no_content
  end

  def search
    # query = params[:query].downcase
    @groups = Group.where("name ILIKE ?", "%" + Group.sanitize_sql_like(params[:query]) + "%")
    # debugger
    render :search
  end

  private 

  def group_params
    params.require(:group).permit(:name, :description, :location, :latitude, :longitude, :owner_id)
  end
end
