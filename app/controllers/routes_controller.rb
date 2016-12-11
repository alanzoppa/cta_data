class RoutesController < ApplicationController
  def longest_by_stops
    routes = Route.select("*,(SELECT count(route_id) from routes_stops WHERE routes_stops.route_id = routes.id) as stop_count").order('stop_count DESC')
    render json: {route: routes}
  end

  def longest_by_distance
    routes = Route.includes(:stops).map do |r|
      any_stop_on_route = r.stops.first
      {
        distance: r.farthest_stops_from(any_stop_on_route)[:distance_between],
        route: r
      }
    end.sort_by {|s| -s[:distance]}
    render json: {route: routes}
  end
end
