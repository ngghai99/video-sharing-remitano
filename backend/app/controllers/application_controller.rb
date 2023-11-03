class ApplicationController < ActionController::API

  private
  def current_user
    @current_user ||= User.find_by(id: token_payload&.dig("user_id"))
  end

  def token
    @token ||= request.headers['Authorization']
  end

  def token_payload
    JwtTokenable.decode_jwt_token(token)
  end

  def render_unauthorized(message)
    render json: { error: message }, status: :unauthorized
  end
end
