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
}
