module Api
  module V1
    class GetVideos
      prepend SimpleCommand
      include ActiveModel::Model
      require 'httparty'

      attr_reader :params

      def initialize(current_user, params = {})
        @params = params
      end

      def call
        videos = Video.includes(:user).order(created_at: :desc)
        videos = videos.map { |video| video.attributes.merge(email:video.user.email) }
        { success: true, videos: videos }
        rescue StandardError => e
          { success: false, errors: e.message }
      end

      private

    end
  end
end
