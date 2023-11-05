class VideosChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'videos'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
