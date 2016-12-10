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

  def self.where_route_is(route_name)
    Route.stops_by_route_name(route_name)
  end

  def self.distance_between(x1, y1, x2, y2)
    x1, y1, x2, y2 = [ x1, y1, x2, y2 ].map(&:to_f)
    ActiveRecord::Base.connection.execute(
      %{
        SELECT earth_distance(
          ll_to_earth(#{x1}, #{y1}),
          ll_to_earth(#{x2}, #{y2})
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
