require 'rails_helper'

RSpec.describe Api::V1::GetVideos do
  describe '#call' do
    context 'when there are videos available' do
      it 'returns a success response with a list of videos' do
        videos = create_list(:video, 5)

        command = described_class.new(nil)
        result = command.call.result

        expect(result[:success]).to be_truthy
        expect(result[:videos].count).to eq(5)
      end
    end

    context 'when there are no videos available' do
      it 'returns a success response with an empty list of videos' do
        command = described_class.new(nil)
        result = command.call.result

        expect(result[:success]).to be_truthy
        expect(result[:videos].count).to eq(0)
      end
    end

    context 'when an error occurs' do
      it 'returns a failure response with an error message' do
        allow(Video).to receive(:all).and_raise(StandardError.new('An error occurred'))

        command = described_class.new(nil)
        result = command.call.result

        expect(result[:success]).to be_falsey
        expect(result[:errors]).to include('An error occurred')
      end
    end
  end
end
