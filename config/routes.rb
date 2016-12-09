Rails.application.routes.draw do
  get '/stops/route/:route_name', to: 'stops#stops_for_route'
  get '/stops', to: 'stops#index'
  get '/stops/:id', to: 'stops#show'
  get '', to: 'stops#index'
end
