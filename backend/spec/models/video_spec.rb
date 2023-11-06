# spec/models/video_spec.rb
require 'rails_helper'

RSpec.describe Video, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      user = User.create(email: 'test@example.com', password: 'password')
      video = user.videos.new(title: 'Video Title', uid: 'OR4kDAjoLt0', link: 'https://www.youtube.com/watch?v=amfWIRasxtI')
      expect(video).to be_valid
    end

    it 'is not valid without a title' do
      user = User.create(email: 'test@example.com', password: 'password')
      video = user.videos.new(uid: 'OR4kDAjoLt0', link: 'https://www.youtube.com/watch?v=amfWIRasxtI')
      expect(video).to_not be_valid
    end

    it 'is not valid without a id' do
      user = User.create(email: 'test@example.com', password: 'password')
      video = user.videos.new(title: 'Video Title', link: 'https://www.youtube.com/watch?v=amfWIRasxtI')
      expect(video).to_not be_valid
    end

    it 'is not valid without a link' do
      user = User.create(email: 'test@example.com', password: 'password')
      video = user.videos.new(title: 'Video Title', uid: 'OR4kDAjoLt0')
      expect(video).to_not be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      user = User.create(email: 'test@example.com', password: 'password')
      video = user.videos.new(title: 'Video Title', uid: 'OR4kDAjoLt0', link: 'https://www.youtube.com/watch?v=amfWIRasxtI')
      expect(video.user).to eq(user)
    end
  end
end
