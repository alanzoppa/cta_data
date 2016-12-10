class Route < ApplicationRecord
  has_and_belongs_to_many :stops

  def self.stops_by_route_name(route_name)
    Route.includes(:stops).find_by_route_name(route_name.to_s).stops.includes(:street, :routes)
  end

  def self.find_direction route_name
    ns = Route.stops_by_route_name(route_name).sort_by {|r| r.longitude}
    ew = Route.stops_by_route_name(route_name).sort_by {|r| r.latitude}
    ns_delta = ns[0].longitude - ns[-1].longitude
    ew_delta = ew[0].latitude - ew[-1].latitude
    binding.pry
  end

  def self.is_east_west? route_name
    self.find_direction route_name
  end 
end
