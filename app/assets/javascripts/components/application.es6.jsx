class Application extends React.Component {
  constructor() {
    super();
    this.state = { lat: null, lng: null, stops: [] };
  }

  componentDidMount() { this.getPoints(); }

  componentDidUpdate() { this.getPoints(); }

  getPoints() {
    var lng = this.props.params.longitude;
    var lat = this.props.params.latitude;
    var route = this.props.params.route;

    updateState = (data)=> { 
      this.setState({lat: lat, lng: lng, stops: data.stops, route: route});
    } 

    if ( lat && lng && lng != this.state.lng && lat != this.state.lat ) {
      loadAdjacentStops(lng,lat).done(updateState);
    }
    else if (route && route != this.state.route) {
      $.get(`/stops/${route}`).done(updateState);
    }
  }

  render () {
    clearMarkers();
    populateMarkers(this.state.stops);
    return <Panel />;
  }
}
