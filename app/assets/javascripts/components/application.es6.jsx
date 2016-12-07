window.loadPoints = (longitude, latitude)=> {
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
        console.log [stop.location[0], stop.location[1]]
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
    return <Panel />;
  }
}

