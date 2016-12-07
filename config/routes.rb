Rails.application.routes.draw do
  resource :stop, only: [:index, :show]
  root to: "stop#index"
end
