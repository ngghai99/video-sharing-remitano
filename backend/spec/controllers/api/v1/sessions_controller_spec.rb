require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :controller do
  describe 'POST #create' do
    context 'with valid credentials' do
      let(:user) { create(:user, email: 'test@example.com', password: 'password') }

      it 'logs in and returns a JSON response with user info if email already exists' do
        user = User.create(email: 'test@example.com', password: 'password')
        post :create, params: { email: 'test@example.com', password: 'password' }
        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
        expect(JSON.parse(response.body)['user']['id']).to eq(user.id)
      end
    end
  end
end
