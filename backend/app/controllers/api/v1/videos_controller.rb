class Api::V1::VideosController < ApplicationController

  def create
    render_unauthorized('Token invalid') unless current_user
    command = Api::V1::CreateVideo.call(current_user, params)
    if command.success?
      render json: command.result
    else
      render json: { errors:command.errors }, status: :unprocessable_entity
    end
  end
end
