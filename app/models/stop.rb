class Stop < ApplicationRecord
  belongs_to :street
  has_and_belongs_to_many :routes

  def self.factory
    RGeo::Geographic.spherical_factory(srid: 4326)
  end

  def self.where_near(longitude, latitude, radius) # radius in meters

    #nearest = Stop.order(
      #"ST_Distance(location, ST_SetSRID(ST_Point(#{longitude}, #{latitude}),4326))"
    #).first

    #SpatialModel.arel_table[:latlon].st_distance("SRID=3785;POINT(2 3)").lt(2))
    Stop.where(Stop.arel_table[:location].st_distance("SRID=4326;POINT(#{longitude} #{latitude})").lt(100))

    #Stop.where(
      #"ST_DWithin(stops.location, ST_GeographyFromText('#{nearest.location.to_s}'), #{radius})",
    #)
  end

  def to_object
    {
      #id: self.id,
      location: [self.location.longitude, self.location.latitude],
      #street: self.street.street_name,
      #routes: self.routes.map(&:route_name)
    }
  end

end




#Stop.where_near(41.87683358, -87.74058525, 100)

#Stop.where("ST_Distance(location, "+ "'POINT(41.87683358 -87.74058525)') < 100")
