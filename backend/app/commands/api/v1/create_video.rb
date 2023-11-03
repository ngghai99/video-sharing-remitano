module Api
  module V1
    class CreateVideo
      prepend SimpleCommand
      include ActiveModel::Model
      require 'httparty'

      attr_accessor :link, :info_video, :current_user, :uid

      def initialize(current_user, params = {})
        @current_user = current_user
        @link = params[:link]
        @uid = parse_video_url(@link)
        @info_video = get_info_video
      end

      def call
        return unless current_user.present?
        return if info_video.code != 200 || info_video["items"].blank?
        video = current_user.videos.new(title: info_video["items"][0]["snippet"]["title"], description: info_video["items"][0]["snippet"]["description"], link: link, uid: uid)
        video.save!
        { success: true, video: video }
        rescue StandardError => e
          { success: false, errors: e.message }
      end

      private

      def get_info_video
        response = HTTParty.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=#{@uid}&key=#{ENV['YOUTUBE_API_KEY']}")
      end

      def parse_video_url(url)
        @url = url

        youtube_formats = [
            %r(https?://youtu\.be/(.+)),
            %r(https?://www\.youtube\.com/watch\?v=(.*?)(&|#|$)),
            %r(https?://www\.youtube\.com/embed/(.*?)(\?|$)),
            %r(https?://www\.youtube\.com/v/(.*?)(#|\?|$)),
            %r(https?://www\.youtube\.com/user/.*?#\w/\w/\w/\w/(.+)\b)
          ]

        @url.strip!

        if @url.include? "youtu"
          youtube_formats.find { |format| @url =~ format } and $1
          @results = $1

          @results
        else
          return nil
        end
      end

    end
  end
end
