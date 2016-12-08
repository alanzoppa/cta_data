
var createMarker = (latlon,title,iwContent) => {
  var marker = new google.maps.Marker({
    position: latlon,
    title: title,
    map: window.map
  });


  google.maps.event.addListener(marker, 'click', function () {
      window.infowindow.setContent(iwContent);
      window.infowindow.open(map, marker);
      });
  return marker;
  }






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

      for (var m of window.markers) { m.setMap(null); }
      for (var stop of data.stops) {
          var markerLatlng = new google.maps.LatLng(stop.location[0], stop.location[1]);
          var title = stop.street;
          var routeLinks = stop.routes.map( (r)=> { return `<a href="#/route/${r}">#${r}</a>` });
          var iwContent = `${stop.street}: ${routeLinks.join(', ')}`
          window.markers.push(
            createMarker(markerLatlng ,title,iwContent)
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
    else if (this.props.params.route) {
      console.log(this.props.params.route)
    }
    return <Panel />;
  }
}
