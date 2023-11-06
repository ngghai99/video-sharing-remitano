require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET #show' do
    context 'with a valid user' do
      let!(:user) { create(:user, id: 1) }

      it 'returns a JSON response with user info' do
        get :show, params: { id: 1 }
        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
        expect(JSON.parse(response.body)['user']['id']).to eq(user.id)
      end
    end

    context 'with an invalid user' do
      it 'returns a JSON response with an error message and status :unauthorized' do
        get :show, params: { id: 999 }
        expect(response).to have_http_status(:unauthorized)
        expect(response.content_type).to include('application/json')
        expect(JSON.parse(response.body)).to have_key('error')
      end
    end
  end
end
