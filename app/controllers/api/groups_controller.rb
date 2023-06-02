class Api::GroupsController < ApplicationController

  # def index
  #   if (current_user)
  #     @joined_groups = current_user.joined_groups.map(&:id)
  #     @my_groups = current_user.groups.map(&:id)
  #     @allGroups =  @groups.map(&:id) - @joined_groups - @groups
  #   end
  # else
  #   @joined_groups = []
  #   @groups = []
  # end

  # def create
  #   @group = Group.new(group_params)
  #   if (@group.save)
  #     @creator = current_user
  #     @memberships = []
  #     @count = 1
  #     @events = []
  #     render :show
  #   else
  #     render json {errors @group.errors.full_messages}
  #   end

  # def destroy
  #   @group = Group.find_by(id: params[:id])
  #   if (@group.owner_id == current_user.id)
  #     @group.destroy
  #     render json: {message: "Group successfully removed"}, status: 200
  #   else
  #     render json: {errors: ["Only the group creator has permission to remove this group"]}, status: 400
  #   end
  # end

  # def show 
  #   @group = Group.include

  # end

  private 

#   def group_params
#     params.require(:group).permit(:name, :description, :location, :owner_id)
#   end
end
