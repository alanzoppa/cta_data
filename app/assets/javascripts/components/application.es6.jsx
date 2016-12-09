class Application extends React.Component {
  constructor() {
    super();
    this.state = { lat: null, lng: null, stops: [] };
  }

  componentDidMount() { this.getPoints(); }

  componentDidUpdate() { this.getPoints(); }

  getPoints() {
    const lng = this.props.params.longitude;
    const lat = this.props.params.latitude;
    const route = this.props.params.route;
    const stop_id = this.props.params.stop_id;

    updateState = (data)=> { 
      this.setState(
        {lat: lat, lng: lng, stops: data.stops, route: route, stop_id: stop_id}
      );
    } 

    if ( lat && lng && lng != this.state.lng && lat != this.state.lat ) {
      loadAdjacentStops(lng,lat).done(updateState);
    }
    else if (route && route != this.state.route) {
      $.get(`/stops/route/${route}`).done(updateState);
    }
    else if (stop_id && stop_id != this.state.stop_id) {
      $.get(`/stops/${this.props.params.stop_id}`).done(updateState);
    }
  }

  render () {
    clearMarkers();
    populateMarkers(this.state.stops);
    return <Panel stops={this.state.stops} />;
  }
}
