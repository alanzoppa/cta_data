class Radius extends Application {

  handleData(data) {
    console.log(arguments);
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
