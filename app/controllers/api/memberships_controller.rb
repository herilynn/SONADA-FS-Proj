class Api::MembershipsController < ApplicationController
    before_action :require_logged_in, only: [:create]
    before_action :require_logged_in, only: [:destroy]

    def create
        @group_id = params[:group_id]
        @isMember = Membership.new(member_id: current_user.id, group_id: @group_id)
        if (@isMember.save)
            render :show
        else
            render json: {errors: @isMember.errors.full_messages}, status: 422 
        end
    end

    def destroy
        @isMember = Membership.find_by(member_id: current_user.id, group_id: params[:id])
        if (@isMember.destroy)
            render :show
        else
            render json: {errors: @isMember.errors.full_messages}, status: 422
        end
    end
end

