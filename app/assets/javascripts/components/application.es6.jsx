class Application extends React.Component {
  constructor() {
    super();
    this.state = { stops: [], route_info: [] };
  }

  componentDidMount() { this.updateStops(); }

  componentDidUpdate() { this.updateStops(); }

  getPoints() {
    const s = this.state;
    const p = this.props.params;
  }

  handleData(data) { return }

  updateStops() {
    const s = this.state;
    const p = this.props.params;

    updateState = (data)=> { 
      this.setState(
        {
          latitude: p.latitude,
          longitude: p.longitude,
          stops: data.stops,
          route: p.route,
          stop_id: p.stop_id,
          route_info: data.route_info
        }
      );
      return data;
    } 

    if (getPoints = this.getPoints()) {
      getPoints.then(updateState).then(
        (data) => { this.handleData.call(this, data) }
      )
    }
  }

  setCenter(latitude, longitude) {
    if (latitude == null) {return}
    const point = new google.maps.LatLng(latitude, longitude);
    window.map.panTo(point);
  }

  render () {
    clearMarkers();
    populateMarkers(this.state.stops);
    if (this.state.center) {this.setCenter(...this.state.center)};
    if (this.state.zoom) {window.map.setZoom(this.state.zoom)};
    return <Panel
      params={this.props.params}
      stops={this.state.stops}
      route_info={this.state.route_info}
    />;
 }
}
