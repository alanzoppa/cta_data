require 'timeout'

class Route < ApplicationRecord
  has_and_belongs_to_many :stops

  scope :stops_by_route_name, ->(route_name) do
    includes(:stops).find_by_route_name(
      route_name.to_s
    ).stops.includes(:street, :routes)
  end

  def get_direction
    return north_south_delta > east_west_delta ? :"north-south" : :"east-west"
  end

  def is_north_south?
    get_direction == :"north-south"
  end

  def is_east_west?
    get_direction == :"east-west"
  end

  def farthest_stops_from(*args)
    #This implementation is NP-Hard 
    Timeout::timeout(5) do
      latitude, longitude = Stop.stop_or_points_to_safe_points(*args)
      farthest = self.stops.by_distance_from(*args).to_a.last
      farthest_from_farthest = self.stops.by_distance_from(farthest).to_a.last
      HashWithIndifferentAccess.new({
        origin: {latitude: latitude, longitude: longitude},
        farthest: farthest,
        farthest_from_farthest: farthest_from_farthest,
        distance_between: farthest.distance_from(farthest_from_farthest)
      })
    end
  end

  def farthest_stops_from_to_object(*args)
    o = farthest_stops_from(*args)
    o[:farthest] = o[:farthest].to_object
    o[:farthest_from_farthest] = o[:farthest_from_farthest].to_object
    o
  end

  def self.referenced_by(stops)
    route_ids = stops.map(&:route_ids).flatten.uniq
    Route.where(id: route_ids)
  end

  private

  def stops_north_to_south
    @ns ||= Route.stops_by_route_name(route_name).north_to_south
  end

  def stops_east_to_west
    @ew ||= Route.stops_by_route_name(route_name).east_to_west
  end

  def default_longitude
    @default_longitude ||= stops_east_to_west.average(:longitude)
  end

  def default_latitude
    @default_latitude ||= stops_north_to_south.average(:latitude)
  end

  def north_south_delta
    Stop.distance_between(
      stops_north_to_south.first.latitude,
      default_longitude,
      stops_north_to_south.last.latitude,
      default_longitude,
    )
  end

  def east_west_delta
    Stop.distance_between(
      default_latitude,
      stops_east_to_west.first.longitude,
      default_latitude,
      stops_east_to_west.last.longitude,
    )
  end



end
