class Api::GroupsController < ApplicationController
  before_action :require_logged_in, only: [:create]

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
    @group.owner_id = current_user.id
    # debugger
    if (@group.save)
      membership = Membership.new(member_id: current_user.id, group_id: @group.id)
      membership.save
      render :show
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.delete if @group.owner_id == current_user.id
    render :index
  end

  def search
    @groups = Group.where("name ILIKE ?", "%" + Group.sanitize_sql_like(params[:query]) + "%")
    render :search
end

  private 

  def group_params
    params.require(:group).permit(:name, :description, :location, :owner_id)
  end
end
