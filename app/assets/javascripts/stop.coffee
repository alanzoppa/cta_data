# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


loadPoints = (longitude, latitude)->
  for m in window.markers
    m.setMap null
  $.get(
    'stops.json',
    {
      longitude: longitude,
      latitude: latitude,
      radius: 100
    }
  ).done(
    (data)=>
      for stop in data.stops
        console.log [stop.location[0], stop.location[1]]
        window.markers.push(
          new google.maps.Marker({
            position: {lat: stop.location[0], lng: stop.location[1]},
            map: @map
          })
        )
  )



@initMap = ->
  @markers = []
  @map = new google.maps.Map(
    document.getElementById('map'),
    { center: { lat: 41.87632184, lng: -87.77410482 }, zoom: 14 }
  )


  @map.addListener 'click', (click)->
    loadPoints(
      click.latLng.lat(),
      click.latLng.lng()
    )

