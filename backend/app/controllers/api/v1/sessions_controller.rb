class Api::V1::SessionsController < ApplicationController
  def create
    command = Api::V1::Authenticate.call(params[:email], params[:password])
  end
end
