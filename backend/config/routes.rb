Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "login" => "sessions#create"
      resources :videos
    end
  end
end
