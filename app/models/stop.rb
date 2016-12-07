class Stop < ApplicationRecord
  belongs_to :street
  has_and_belongs_to_many :routes

  def self.where_near(latitude, longitude, radius) # radius in meters

    # earth_box uses the indices, but earth_distance gives the real answer
    # earth_box is just constraining the set that earth_distance operates
    # against

    Stop.includes(:street, :routes).where(
      %{
      earth_box( ll_to_earth(latitude, longitude), ?) @> ll_to_earth(?, ?) AND
      earth_distance( ll_to_earth(latitude, longitude), ll_to_earth(?, ?)) < ? 
      }, radius, latitude, longitude, latitude, longitude, radius
    )

  end

  def to_object
    {
      #id: self.id,
      location: [self.latitude.to_f, self.longitude.to_f],
      street: self.street.street_name,
      routes: self.routes.map(&:route_name)
    }
  end

end
