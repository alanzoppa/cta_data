Rails.application.routes.draw do
  resource :stops, only: [:index, :show]
  root to: "stops#index"
end
