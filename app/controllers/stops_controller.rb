class StopsController < ApplicationController
  def index 
    respond_to do |format|
      format.html
    end
  end

  def show
    permitted = params.permit(:longitude, :latitude, :radius)

    stops = Stop.where_near(
      permitted[:latitude].to_f,
      permitted[:longitude].to_f,
      permitted[:radius].to_f,
    )

    respond_to do |format|
      format.html
      format.json {
        render json: {stops: stops.map {|s| s.to_object}}
      }
    end
  end

  def stops_for_route
    stops = Route.includes(:stops).find_by_route_name(params[:route_name]).stops.includes(:street, :routes)
    render json: {stops: stops.map {|s| s.to_object}}
  end
end




