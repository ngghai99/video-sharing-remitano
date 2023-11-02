module Api
  module V1
    class Authenticate
      prepend SimpleCommand
      attr_reader :email, :password

      def initialize(email, password)
        @email = email
        @password = password
      end

      def call
        user = User.find_by(email: email)
        unless user&.authenticate(password)
          user = User.create!(email: email, password: password)
        end

        payload = { user_id: user.id }
        token = JwtTokenable.generate_jwt_token(payload)
        response_data = { user: user, token: token }

        return response_data.to_json
      end
    end
  end
end
