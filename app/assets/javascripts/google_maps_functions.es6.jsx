var clearMarkers = ()=> {
  for (var m of window.markers) { m.setMap(null); }
}

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


var loadAdjacentStops = (longitude, latitude)=> {
  longitude = parseFloat(longitude);
  latitude = parseFloat(latitude);
  return $.get(
    'stops.json',
    {
      longitude: longitude,
      latitude: latitude,
      radius: 250
    }
  ) 
}

var populateMarkers = (data)=> {
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


var loadPoints = (longitude, latitude)=> {
  loadAdjacentStops(longitude,latitude).done(populateMarkers)
}

var loadRouteStops = (routeName)=> {
   return $.get(`/stops/${routeName}`).done(populateMarkers)
}


