Rails.application.routes.draw do
  get "/auth/:provider/callback" => "sessions#create"
  get "/signout" => "sessions#destroy", :as => :signout

  resources :users, only: [:update, :destroy, :show]
  root to: "static#index"
end
