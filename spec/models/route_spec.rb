require 'rails_helper'

RSpec.describe Route, type: :model do
  it "should return all the stops along a route" do
    stops = Route.stops_by_route_name('72')
    expect(stops.map {|s| s.latitude.to_f}.sort).to eql(
      [
        41.909026, 41.90883939, 41.9089, 41.90897029, 41.90899595, 41.908996,
        41.90900079, 41.909098, 41.90910983, 41.90919299, 41.90917318,
        41.90920726, 41.90924112, 41.909346, 41.909379, 41.909415, 41.90938864,
        41.90943469, 41.9094542, 41.90951085, 41.90955069, 41.909615, 41.909622,
        41.909646, 41.909678, 41.9097113, 41.90979921, 41.90988, 41.90990591,
        41.909942, 41.90990846, 41.90998056, 41.91003426, 41.91006308,
        41.91009545, 41.91011374, 41.91018316, 41.91022365, 41.91020502,
        41.91028665, 41.91032665, 41.91035414, 41.91041332, 41.91046366,
        41.91049966, 41.91053566, 41.91055657, 41.9105698, 41.91076826,
        41.91083785, 41.91090304, 41.91092214, 41.91096789, 41.91099843,
        41.91102809, 41.91104991, 41.91109336, 41.91128, 41.9112345,
        41.91118658, 41.91122311, 41.91119711, 41.91106838, 41.91094308,
        41.91086645, 41.91069722, 41.91068367, 41.9106159, 41.91058066,
        41.9105443, 41.91053508, 41.91049688, 41.91043747, 41.9103899,
        41.91036749, 41.91037945, 41.91030323, 41.91027233, 41.91018035,
        41.9101141, 41.91005901, 41.91009453, 41.91009652, 41.91002051,
        41.90994926, 41.90993395, 41.909845, 41.909819, 41.909795, 41.90976801,
        41.90974281, 41.90969035, 41.90963318, 41.90964664, 41.90960786,
        41.90953297, 41.90950919, 41.90951043, 41.90945565, 41.90942605,
        41.90939658, 41.90936486, 41.90929576, 41.90931092, 41.90927935,
        41.90927192, 41.90922199, 41.9091393, 41.90910081, 41.90911634,
        41.9090582, 41.90903838, 41.90900206, 41.90972056, 41.91056188,
        41.910681, 41.90961154, 41.91098859, 41.90993268, 41.91015491,
        41.90927158, 41.90977952, 41.91108468, 41.90948288, 41.91064525,
        41.91081131, 41.91076954, 41.91144634, 41.90974851, 41.90948436,
        41.91017528, 41.90915677, 41.90989259, 41.90919935, 41.91102555,
        41.91069828, 41.91001533, 41.91067122, 41.91079739, 41.91033711,
        41.91027925, 41.91022104, 41.90998862, 41.91036162
      ].sort
    )
  end

  it 'identifies east-west routes' do
    r = Route.find_by_route_name('72')
    expect( r.is_east_west? ).to be true
  end

  it 'identifies north-south routes' do
    r = Route.find_by_route_name('50')
    expect( r.is_north_south? ).to be true
  end

  it 'measures route deltas' do
    r1 = Route.find_by_route_name('72')
    expect(r1.send :north_south_delta).to eql 290.205757019844
    expect(r1.send :east_west_delta).to eql 14457.2183129063

    r2 = Route.find_by_route_name('50')
    expect(r2.send :north_south_delta).to eql 17479.6305880011
    expect(r2.send :east_west_delta).to eql 1015.69269365224
  end

  it 'finds the most distant stops' do
    latitude = 41.91058122516316
    longitude = -87.67737865447998 
    r1 = Route.find_by_route_name('72')
    farthest_stops = r1.farthest_stops_from(latitude, longitude)
    expect( farthest_stops[:farthest].cross_street ).to eql "WABANSIA"
    expect( farthest_stops[:farthest_from_farthest].cross_street ).to eql "CLARK"
    expect( farthest_stops[:distance_between] ).to eql 14457.2494763013
    expect( farthest_stops[:origin][:latitude] ).to eql latitude
    expect( farthest_stops[:origin][:longitude] ).to eql longitude
  end

  it 'should find routes referenced by stops' do
    stops = Stop.where_near(41.91058122516316, -87.67737865447998, 250)
    routes = Route.referenced_by(stops)
    expect(routes.map(&:route_name)).to eql ["50", "56", "72"]
  end

  it 'should find routes referenced by stops' do
    stops = Stop.where_near(41.91058122516316, -87.67737865447998, 250)
    routes = Route.referenced_by(stops)
    expect(routes.map(&:route_name)).to eql ["50", "56", "72"]
  end


end
