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
      end
    end
  end
end
