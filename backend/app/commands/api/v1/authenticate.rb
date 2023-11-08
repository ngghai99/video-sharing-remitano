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

        if user.blank?
          user = User.create!(email: email, password: password)
        elsif !user&.authenticate(password)
          errors.add(:error, "Please check your Email or Password.")
          return nil
        end
        payload = { user_id: user.id }
        token = JwtTokenable.generate_jwt_token(payload)
        response_data = { user: user, token: token }
        return response_data.to_json

      rescue StandardError => e
        errors.add(:error, e)
      end
    end
  end
end
