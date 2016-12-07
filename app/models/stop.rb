class Stop < ApplicationRecord
  belongs_to :street
  has_and_belongs_to_many :routes

  def self.where_near(longitude, latitude, radius) # radius in meters
    Stop.where(
      "earth_distance(ll_to_earth(longitude, latitude), ll_to_earth(#{longitude}, #{latitude})) < #{radius}"
    )

  end

  def to_object
    {
      #id: self.id,
      location: [self.longitude.to_f, self.latitude.to_f],
      street: self.street.street_name,
      routes: self.routes.map(&:route_name)
    }
  end

end
