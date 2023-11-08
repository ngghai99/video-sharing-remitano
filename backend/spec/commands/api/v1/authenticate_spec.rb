require 'rails_helper'

RSpec.describe Api::V1::Authenticate do
  describe '#call' do
    let!(:email) { 'user@example.com' }
    let!(:password) { 'password' }
    let!(:user) { create(:user, email: email, password: password) }
    let(:payload) { { user_id: user.id } }
    let(:token) { JwtTokenable.generate_jwt_token(payload) }

    context 'when the user exists and authenticates successfully' do
      it 'returns a JSON response with user and token' do
        command = described_class.new(email, password)

        response_data = JSON.parse(command.call.result)
        expect(response_data).to include( 'user' => user.as_json, 'token' => token )
      end
    end

    context 'when the user does not exist' do
      it 'creates a new user and returns a JSON response with user and token' do
        command = described_class.new('new_user@example.com', 'new_password123')

        expect { command.call }.to change(User, :count).by(1)

        response_data = JSON.parse(command.call.result)
        expect(response_data).to include( 'user' => a_kind_of(Hash), 'token' => a_kind_of(String) )
      end
    end

    context 'when the user exists but authentication fails' do
      it 'raises an error' do
        command = described_class.new(email, 'wrong_password')

        expect(command.success?).to be_falsey
        expect(command.call.errors).to have_key(:error)
      end
    end
  end
end
