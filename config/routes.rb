Rails.application.routes.draw do
  get "/auth/:provider/callback" => "sessions#create"
  get "/signout" => "sessions#destroy", :as => :signout

  get "/chats/:chat_id/messages" => "messages#index"
  post "/chats/:chat_id/messages" => "messages#create"

  resources :users, only: [:update, :destroy, :show]
  resources :matches, only: [:index, :create, :update, :destroy]
  root to: "static#index"
end
