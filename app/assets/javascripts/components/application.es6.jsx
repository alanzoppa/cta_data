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
        console.log(stop.routes);
        var routeLinks = stop.routes.map( (r)=> { return `<a href="#/route/${r}">${r}</a>` });
        console.log(routeLinks);

        var infowindow = new google.maps.InfoWindow({
          content: `<p>${routeLinks.join(', ')}`
        });
        var marker = new google.maps.Marker({
          position: {lat: stop.location[0], lng: stop.location[1]},
          map: window.map,
          title: 'herp'
        })

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });


        window.markers.push(marker)
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
