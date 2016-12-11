class StopsController < ApplicationController
  def index 
    permitted = params.permit(:longitude, :latitude, :radius)

    stops = Stop.where_near(
      permitted[:latitude].to_f,
      permitted[:longitude].to_f,
      permitted[:radius].to_f,
    ).map {|s| s.to_object}

    respond_to do |format|
      format.html
      format.json {
        render json: { stops: stops, }
      }
    end
  end

  def show
    stop = Stop.find(params[:id])
    route_info = Stop.farthest_from_point_by_route(stop: stop, as_object: true)

    render json: {
      stops: [stop.to_object],
      route_info: route_info
    }
  end

  def stops_for_route
    stops = Stop.where_route_is params[:route_name]
    render json: {stops: stops.map {|s| s.to_object}}
  end

  def by_route_count
    stops = Stop.joins(:street, :routes).select("streets.street_name, cross_street, longitude, latitude,(SELECT count(route_id) from routes_stops WHERE routes_stops.stop_id = stops.id) as count_of_stops").order('count_of_stops DESC')
    render json: {stops: stops.as_json(except: [:id])}
  end

end



