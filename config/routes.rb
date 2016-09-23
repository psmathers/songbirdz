Rails.application.routes.draw do
  get "/auth/:provider/callback" => "sessions#create"
  get "/signout" => "sessions#destroy", :as => :signout

  root to: "static#index"
end
