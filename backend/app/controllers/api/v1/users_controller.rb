class Api::V1::UsersController < ApplicationController
  def show
    command = Api::V1::GetUser.call(params)
    if command.success? && command.result[:success]
      render json: command.result
    else
      render json: { error: command.result[:errors] }, status: :unauthorized
    end
  end
end
