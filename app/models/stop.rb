class Stop < ApplicationRecord
  belongs_to :street
  has_and_belongs_to_many :routes

  scope :where_near, ->(latitude, longitude, radius) do

    # earth_box uses the indices, but earth_distance gives the real answer
    # earth_box is just constraining the set that earth_distance operates
    # against

    includes(:street, :routes).order('cross_street ASC').where(
      %{
      earth_box( ll_to_earth(latitude, longitude), ?) @> ll_to_earth(?, ?) AND
      earth_distance( ll_to_earth(latitude, longitude), ll_to_earth(?, ?)) < ?
      }, radius, latitude, longitude, latitude, longitude, radius
    )
  end

  scope :north_to_south, -> do
    order('stops.latitude DESC')
  end

  scope :east_to_west, -> do
    order('stops.longitude DESC')
  end

  scope :by_distance_from, ->(*args) do
    latitude, longitude = Stop.stop_or_points_to_safe_points(*args)
    order("earth_distance( ll_to_earth(stops.latitude, stops.longitude), ll_to_earth(#{latitude}, #{longitude})) ASC")
  end

  def self.farthest_from_point_by_route(latitude, longitude, as_object=false, radius=250)
    method = as_object ? :farthest_stops_from_to_object : :farthest_stops_from
    stops = Stop.where_near(latitude, longitude, radius)
    routes = Route.referenced_by(stops)
    routes.map do |route|
      {
        route_name: route.route_name,
        stops: route.send(method, latitude, longitude)
      }
    end
  end

  def self.stop_or_points_to_safe_points *args
    validation_message = "Input should be a Stop or just x and y"
    case(args.length)
    when 1
      unless args[0].is_a? Stop
        raise validation_message
      end
      points = [ args[0].latitude, args[0].longitude ]
    when 2
      unless (points = args.map(&:to_f))
        raise validation_message
      end
      points = args
    else
      raise validation_message
    end
    return points
  end

  def self.where_route_is(route_name)
    Route.stops_by_route_name(route_name)
  end

  def self.distance_between(lat1, long1, lat2, long2)
    lat1, long1, lat2, long2 = [ lat1, long1, lat2, long2 ].map(&:to_f)
    ActiveRecord::Base.connection.execute(
      %{
        SELECT earth_distance(
          ll_to_earth(#{lat1}, #{long1}),
          ll_to_earth(#{lat2}, #{long2})
          )
      }
      ).first["earth_distance"]
  end

  def distance_from(other)
    Stop.distance_between(
      self.latitude, self.longitude,
      other.latitude, other.longitude
    )
  end

  def to_object
    {
      id: self.id,
      location: [self.latitude.to_f, self.longitude.to_f],
      street: self.street.street_name,
      cross_street: self.cross_street,
      routes: self.routes.map(&:route_name)
    }
  end
end
