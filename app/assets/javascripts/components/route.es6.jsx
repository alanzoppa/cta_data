class Route extends Application {

  getPoints() {
    const route = this.props.params.route;
    if (route && route != this.state.route) {
      return $.get(`/stops/route/${route}`)
    }
  }
}
