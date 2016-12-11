class Radius extends Application {

  handleData(data) {
    this.setState({center: [this.props.params.latitude, this.props.params.longitude]})
  } 

  getPoints() {
    const latitude = this.props.params.latitude;
    const longitude = this.props.params.longitude;
    if ( latitude && longitude &&
         latitude != this.state.latitude &&
         longitude != this.state.longitude
       ) { return loadAdjacentStops( latitude, longitude) }
  }

}
