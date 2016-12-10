require 'rails_helper'

RSpec.describe Stop, type: :model do
  before(:all) do
    if Route.count == 0
      raise "please run `RAILS_ENV='test' bundle exec rake import_csvs`"
    end

    @x1, @y1 = [ 41.909026, -87.80401 ]
    @x2, @y2 = [ 41.90911634, -87.79710938 ]

  end
  it "should gather points in an arbitrary radius of a given point" do
    stops = Stop.where_near(41.881128434236246,-87.6321029663086,250)
    expect(stops.map {|s| [s.latitude.to_f, s.longitude.to_f]}.sort).to eql(
      [
        [41.879426, -87.634024],
        [41.883137, -87.632625],
        [41.882042, -87.630679],
        [41.8820052, -87.63408179],
        [41.880948, -87.629285],
        [41.882043, -87.633892],
        [41.880771, -87.633875],
        [41.879472, -87.633809],
        [41.87950311, -87.6324292],
        [41.881838, -87.632265],
        [41.88178988, -87.63246161],
        [41.88062407, -87.63249507],
        [41.8813809, -87.6309716],
        [41.87947219, -87.6311045]
      ].sort
    )
  end

  it "should be able to calculate the distance between any two points" do
    expect( Stop.distance_between(@x1,@y1,@x2,@y2) ).to eql 571.770407483036
  end

  it "should be able to calculate the distance between any two points" do
    stop1 = Stop.where_near(@x1,@y1,1).first
    stop2 = Stop.where_near(@x2,@y2,1).first
    expect( stop1.distance_from(stop2) ).to eql 571.770407483036
  end

  it 'should find farthest stops from points' do
    stops = Stop.farthest_from_point_by_route(41.91058122516316, -87.67737865447998)
    expect(stops.map(&:keys)).to eql(
      [[:route_name, :stops], [:route_name, :stops], [:route_name, :stops]]
    )
  end



end
