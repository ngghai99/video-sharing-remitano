class JwtTokenable
  class << self
    EXPIRATION_TIME = 7.days.to_i

    def generate_jwt_token(payload)
      payload[:exp] = Time.now.to_i + EXPIRATION_TIME
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end

    def decode_jwt_token(token)
      decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base)
      decoded_token[0]
    rescue JWT::ExpiredSignature, JWT::DecodeError
      return nil
    end

  end
end
