class Route < ApplicationRecord
  has_and_belongs_to_many :stops

  def self.stops_by_route_name(route_name)
    Route.includes(:stops).find_by_route_name(route_name.to_s).stops.includes(:street, :routes)
  end
end
