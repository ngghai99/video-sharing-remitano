module Api
  module V1
    class GetUser
      prepend SimpleCommand
      include ActiveModel::Model

      attr_reader :params, :id

      def initialize(params = {})
        @params = params
        @id = params[:id]
      end

      def call
        user = User.find_by_id(id)
        { success: true, user: user }
        rescue StandardError => e
          { success: false, errors: e.message }
      end

      private

    end
  end
end
