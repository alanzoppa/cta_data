class Application extends React.Component {

  render () {
    if (this.props.params.longitude && this.props.params.latitude) {
      clearMarkers()
      loadPoints(this.props.params.longitude, this.props.params.latitude)
    }
    else if (this.props.params.route) {
      clearMarkers();
      loadRouteStops(this.props.params.route).done(populateMarkers);
    }
    return <Panel />;
  }
}
