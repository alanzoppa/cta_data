class SingleStop extends Application {

  handleData(data) {
    this.setState({center: data.stops[0].location})
  }

  getPoints() {
    const stop_id = this.props.params.stop_id;
    if (stop_id && stop_id != this.state.stop_id) {
      return $.get(`/stops/${stop_id}`);
    }
  }

  render () {
    this.setupMap();
    return <section id="panel"><RouteData route_info={this.state.route_info} stop={this.state.stops[0]} /></section>
  }

}




