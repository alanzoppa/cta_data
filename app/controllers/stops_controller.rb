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
end



