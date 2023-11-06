require 'rails_helper'

RSpec.describe Api::V1::CreateVideo do
  let(:current_user) { create(:user) }
  let(:params) { { link: 'https://www.youtube.com/watch?v=amfWIRasxtI' } }
  let(:video_data) do
    {
      "items" => [
        {
          "snippet" => {
            "title" => "Video Title",
            "description" => "Video Description"
          }
        }
      ]
    }
  end

  before do
    allow(HTTParty).to receive(:get) do |url|
      if url.start_with?('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=')
        double(code: 200, parsed_response: video_data)
      else
        double(code: 404, parsed_response: {})
      end
    end
  end

  context 'when creating a video' do
    it 'creates a video for the current user' do
      command = described_class.new(current_user, params)

      expect { command.call }.to change(Video, :count).by(1)

      video = Video.last
      expect(video.link).to eq('https://www.youtube.com/watch?v=amfWIRasxtI')
    end

    it 'returns a success response with the video' do
      command = described_class.new(current_user, params)
      result = command.call.result

      expect(result[:success]).to be_truthy
      expect(result[:video]).to be_an_instance_of(Video)
    end
  end

  context 'when the video URL is invalid' do
    it 'returns a failure response with an error message' do
      command = described_class.new(current_user, link: 'invalid_url')

      result = command.call.result

      expect(result[:success]).to be_falsey
      expect(result[:errors]).to include("Validation failed: Uid can't be blank")
    end
  end

  context 'when the current user is not provided' do
    it 'returns a failure response with an error message' do
      command = described_class.new(nil, params)

      result = command.call.result

      expect(result[:success]).to be_falsey
      expect(result[:errors]).to include('Current user is missing')
    end
  end
end
