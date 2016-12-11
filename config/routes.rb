Rails.application.routes.draw do
  get '/stops/by_route_count', to: 'stops#by_route_count'
  get '/stops/route/:route_name', to: 'stops#stops_for_route'
  get '/stops', to: 'stops#index'
  get '/stops/:id', to: 'stops#show'
  get '/routes/longest_by_stops', to: 'routes#longest_by_stops'
  get '/routes/longest_by_distance', to: 'routes#longest_by_distance'
  get '', to: 'stops#index'
end
