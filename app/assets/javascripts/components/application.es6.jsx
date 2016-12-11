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
      getPoints.then(updateState).then(this.handleData)
    }
  }

  render () {
    clearMarkers();
    populateMarkers(this.state.stops);
    return <Panel stops={this.state.stops} route_info={this.state.route_info}/>;
  }
}
