require 'rails_helper'
require 'jwt'

RSpec.describe Api::V1::VideosController, type: :controller do
  let(:user) { create(:user) }

  describe 'POST #create' do
    context 'with a valid user and valid parameters' do
      it 'creates a new video and returns a JSON response with video info' do
        token = JWT.encode({ user_id: user.id }, ENV["JWT_SECRET"])
        request.headers['Authorization'] = token

        post :create, params: { title: 'Video Title', uid: 'OR4kDAjoLt0', link: 'https://www.youtube.com/watch?v=amfWIRasxtI' }
        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
        expect(JSON.parse(response.body)).to have_key('video')
      end
    end

    context 'with invalid parameters' do
      it 'returns a JSON response with errors and status :unprocessable_entity' do
        token = JWT.encode({ user_id: user.id }, ENV["JWT_SECRET"])
        request.headers['Authorization'] = token

        post :create, params: { title: '', uid: '', link: '' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end

    context 'with an invalid user' do
      it 'returns a JSON response with an error message and status :unauthorized' do
        post :create, params: { title: 'Video Title', uid: 'OR4kDAjoLt0', link: 'https://www.youtube.com/watch?v=amfWIRasxtI' }
        expect(response).to have_http_status(:unauthorized)
        expect(response.content_type).to include('application/json')
        expect(JSON.parse(response.body)).to have_key('error')
      end
    end
  end

  describe 'GET #index' do
    it 'returns a JSON response with a list of videos' do
      get :index
      expect(response).to have_http_status(:success)
      expect(response.content_type).to include('application/json')
      expect(JSON.parse(response.body)).to have_key('videos')
    end
  end
end
