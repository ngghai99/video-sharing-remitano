class Api::V1::VideosController < ApplicationController

  def create
    render_unauthorized('Token invalid') and return unless current_user
    command = Api::V1::CreateVideo.call(current_user, params)
    if command.success? && command.result&.fetch(:video, nil).present?
      ActionCable.server.broadcast 'videos', {video: command.result[:video]}
      render json: command.result
    else
      render json: { errors:command.errors }, status: :unprocessable_entity
    end
  end

  def index
    command = Api::V1::GetVideos.call(current_user, params)
    if command.success?
      render json: command.result
    else
      render json: { errors:command.errors }, status: :unprocessable_entity
    end
  end
end
