class Api::V1::UsersController < ApplicationController
  def show
    command = Api::V1::GetUser.call(params)
    if command.success?
      render json: command.result
    else
      render json: { error: command.errors[:error] }, status: :unauthorized
    end
  end
end
