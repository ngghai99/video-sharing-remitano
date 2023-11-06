require 'rails_helper'

RSpec.describe Api::V1::GetUser do
  describe '#call' do
    let(:user) { create(:user) }
    let(:params) { { id: user.id } }

    context 'when the user exists' do
      it 'returns a success response with the user' do
        command = described_class.new(params)
        result = command.call.result

        expect(result[:success]).to be_truthy
        expect(result[:user]).to be_an_instance_of(User)
        expect(result[:user].id).to eq(user.id)
      end
    end

    context 'when the user does not exist' do
      it 'returns a failure response with an error message' do
        non_existing_id = User.maximum(:id).to_i + 1
        params[:id] = non_existing_id

        command = described_class.new(params)
        result = command.call.result

        expect(result[:success]).to be_falsey
        expect(result).to have_key(:errors)
      end
    end
  end
end
