require 'rails_helper'

RSpec.describe StopsController, type: :controller do

  it "should hit the right method" do
    expect(Stop).to receive(:where_near).and_return([])
    get :show, latitude: 41.881128434236246, longitude: -87.6321029663086, radius: 250, format: 'json'
  end
end
