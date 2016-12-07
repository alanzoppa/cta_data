# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


@markers = []

@initMap = ->
  @map = new google.maps.Map(
    document.getElementById('map'),
    { center: { lat: 41.88, lng: -87.65 }, zoom: 14 }
  )


  @map.addListener 'click', (click)->
    window.location.hash = "#/point/#{click.latLng.lng()}/#{click.latLng.lat()}"
    #loadPoints(
      #click.latLng.lat(),
      #click.latLng.lng()
    #)

