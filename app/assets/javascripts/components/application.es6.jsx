loadPoints = (longitude, latitude)=> {
  longitude = parseFloat(longitude);
  latitude = parseFloat(latitude);
  window.markers.map((m)=> {m.setMap(null)})
  $.get(
    'stops.json',
    {
      longitude: longitude,
      latitude: latitude,
      radius: 250
    }
  ).done(
    (data)=> {
      for (var stop of data.stops) {
        window.markers.push(
          new google.maps.Marker({
            position: {lat: stop.location[0], lng: stop.location[1]},
            map: window.map
          })
        )
      }
    }
  )
}





class Application extends React.Component {

  render () {
    if (this.props.params.longitude && this.props.params.latitude) {
      loadPoints(this.props.params.longitude, this.props.params.latitude)
    }
    return <Panel />;
  }
}

