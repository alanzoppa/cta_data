@markers = []

# How is there not a better way to do this?
# http://www.jacklmoore.com/notes/rounding-in-javascript/
Number::round = (precision)->
  Number(Math.round(this+'e'+precision)+'e-'+precision)

Array::average = ->
  this.reduce( ((a, b)-> a+b), 0 ) / this.length

@initMap = ->
  @map = new google.maps.Map(
    document.getElementById('map'),
    { center: { lat: 41.88, lng: -87.65 }, zoom: 14 }
  )
  window.infowindow = new google.maps.InfoWindow()

  @map.addListener 'click', (click)->
    window.location.hash = "#/point/#{click.latLng.lat()}/#{click.latLng.lng()}"
