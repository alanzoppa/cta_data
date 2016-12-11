class SingleStop extends Application {

  getPoints() {
    const stop_id = this.props.params.stop_id;
    if (stop_id && stop_id != this.state.stop_id) {
      return $.get(`/stops/${stop_id}`);
    }
  }
}
