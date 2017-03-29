// var MapWrapper = function(container, center, zoom) {
//   this.googleMap = new google.maps.Map(container, {
//     center: center,
//     zoom: zoom
//   });
// };

// ////////////////////////
var MapWrapper = function(container, center, zoom, map) {
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });


var infoWindow = new google.maps.InfoWindow(main-map);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      }

// ////////////////////////

MapWrapper.prototype = {
  addMarker: function(coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });

    var contentString = '<div id="content">'+
    '<p>Latitude: ' + coords.lat + '</p><p>' + 'Longitude: ' + coords.lng + '</p></div>';

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function() {
     infoWindow.open(this.googleMap, marker);
   }.bind(this));
  },

  addClickEvent: function() {
    google.maps.event.addListener(this.googleMap, "click", function(event) {
      // console.log(event);
      var lat = ("Latitude: ", event.latLng.lat());
      var lng = ("Longitude: ", event.latLng.lng());
      this.addMarker ({ lat: event.latLng.lat(), lng: event.latLng.lng()}); 
    }.bind(this));
  }
};

var app = function() {
  var container = document.getElementById("main-map");
  var center = { lat: 34.6901, lng: 135.1955 };
  var zoom = 10

  var mainMap = new MapWrapper(container, center, zoom);
  mainMap.addMarker(center);
  mainMap.addClickEvent();
};

window.onload = app;