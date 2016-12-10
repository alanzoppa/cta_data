class Application extends React.Component {
  constructor() {
    super();
    this.state = { stops: [] };
  }

  componentDidMount() { this.updateStops(); }

  componentDidUpdate() { this.updateStops(); }

  getPoints() {
    const s = this.state;
    const p = this.props.params;

    switch(true) {
      case (p.latitude && p.longitude && p.latitude != s.latitude && p.longitude != s.longitude):
        return loadAdjacentStops(p.latitude, p.longitude);
      case (p.route && p.route != s.route):
        return $.get(`/stops/route/${p.route}`)
      case (p.stop_id && p.stop_id != s.stop_id):
        return $.get(`/stops/${this.props.params.stop_id}`);
    }
  }

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
          stop_id: p.stop_id
        }
      );
    } 
    
    if (getPoints = this.getPoints()) {
      getPoints.done(updateState)
    }
  }

  render () {
    clearMarkers();
    populateMarkers(this.state.stops);
    return <Panel stops={this.state.stops} />;
  }
}
