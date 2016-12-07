Rails.application.routes.draw do
  resource :stops, only: [:index, :show]
  get '/stops/:route_name', to: 'stops#stops_for_route'
  root to: "stops#index"
end
