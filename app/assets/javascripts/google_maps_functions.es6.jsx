var clearMarkers = ()=> {
  for (var m of window.markers) { m.setMap(null); }
}

var createMarker = (latlon, title, content) => {
  var marker = new google.maps.Marker({
    position: latlon,
    title: title,
    map: window.map
  });

  google.maps.event.addListener(marker, 'click', function () {
      window.infowindow.setContent(content);
      window.infowindow.open(map, marker);
      });
  return marker;
  } 


var loadAdjacentStops = (latitude, longitude, radius)=> {
  radius = radius || 250;
  longitude = parseFloat(longitude);
  latitude = parseFloat(latitude);
  return $.get(
    'stops.json',
    {
      longitude: longitude,
      latitude: latitude,
      radius: radius
    }
  );
}

var populateMarkers = (stops)=> {
  for (var stop of stops) {
      const markerLatlng = new google.maps.LatLng(
        stop.location[0], stop.location[1]
      );
      const title = stop.street;
      const content = `<a href="#/stops/${stop.id}">${stop.street} at ${stop.cross_street}</a>`;
      window.markers.push(
        createMarker(markerLatlng, title, content)
      ) 
  }
}
