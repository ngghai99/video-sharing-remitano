module Api
  module V1
    class GetVideos
      prepend SimpleCommand
      include ActiveModel::Model
      require 'httparty'

      attr_accessor :link, :info_video, :current_user, :uid

      def initialize(current_user, params = {})
        @current_user = current_user
      end

      def call
        return unless current_user.present?
        rescue StandardError => e
          { success: false, errors: e.message }
      end

      private

    end
  end
end
