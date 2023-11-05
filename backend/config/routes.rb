Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "login" => "sessions#create"
      resources :videos
      mount ActionCable.server => '/cable'
      resources :users, only: [:show]
    end
  end
end
