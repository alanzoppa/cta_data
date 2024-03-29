class Route extends Application {
  handleData(data) {
    const avg_lat = data.stops.map((s)=> s.location[0]).average()
      const avg_lng = data.stops.map((s)=> s.location[1]).average()
      this.setState( { zoom: 12, center: [avg_lat, avg_lng]});
  }

  getPoints() {
    const route = this.props.params.route;
    if (route && route != this.state.route) {
      return $.get(`/stops/route/${route}`)
    }
  }

  render () {
    this.setupMap();
    return (
      <section id="panel">
        <h4>Stops on Route #{this.props.params.route}</h4>
        <GenericStopList stops={this.state.stops} />
      </section>
      )
  } 
}
