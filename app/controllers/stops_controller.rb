class StopsController < ApplicationController
  def index 
    permitted = params.permit(:longitude, :latitude, :radius)

    stops = Stop.where_near(
      permitted[:latitude].to_f,
      permitted[:longitude].to_f,
      permitted[:radius].to_f,
    )

    respond_to do |format|
      format.html
      format.json {
        render json: {
          stops: stops.map {|s| s.to_object},
          route_info:
            Stop.farthest_from_point_by_route( latitude = permitted[:latitude].to_f, longitude = permitted[:longitude].to_f, as_object = true)
        }
      }
    end
  end

  def show
    render json: {stops: [Stop.find(params[:id]).to_object]}
  end

  def stops_for_route
    stops = Stop.where_route_is params[:route_name]
    render json: {stops: stops.map {|s| s.to_object}}
  end
end



