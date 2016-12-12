class Radius extends Application {

  handleData(data) {
    const currentZoom = window.map.getZoom();
    this.setState(
        {
          center: [this.props.params.latitude, this.props.params.longitude],
          zoom: currentZoom > 15 ? currentZoom : 15
        })
  } 

  getPoints() {
    const latitude = this.props.params.latitude;
    const longitude = this.props.params.longitude;
    if ( latitude && longitude &&
         latitude != this.state.latitude &&
         longitude != this.state.longitude
       ) { return loadAdjacentStops( latitude, longitude) }
  }

  render () {
    this.setupMap();
    return (
        <section id="panel">
          <h4>Stops within 250 meters of {this.props.params.latitude}, {this.props.params.longitude}</h4>
          <GenericStopList stops={this.state.stops} />
        </section>
        )
 } 
}
