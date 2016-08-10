/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('geopointInputService',[
  function(){
    return function(scope) {
      if(scope.kepsModel){
        scope.data.value = scope.kepsModel;
        scope.data.lat = scope.kepsModel[0];
        scope.data.lng = scope.kepsModel[1];
      }
      var firstMapRun = true;
      var map;
      var marker;

      scope.testLatLng = function(){
        if(scope.data.lat <= 85 && scope.data.lat >= -85  &&
           scope.data.lng <= 180 && scope.data.lng >= -180){

          if(scope.data.lat && scope.data.lng && firstMapRun){
            var initMap = function(){
              var latLng = new google.maps.LatLng(scope.data.lat, scope.data.lng);
              map = new google.maps.Map(document.getElementById('map'),
                {
                  center:latLng,
                  zoom:6
                }
              );
              marker = new google.maps.Marker(
                {
                  position: latLng,
                  map: map,
                }
              );
              firstMapRun = false;
            };
            if(typeof(google) === 'undefined'){
              var s = document.createElement('script');
              s.src = window.location.protocol + "//maps.googleapis.com/maps/api/js?callback=initMap";
              document.body.appendChild(s);
            }else{
              initMap();
            }

          }else{
            if(scope.data.lat && scope.data.lng){
              var latLng = new google.maps.LatLng(scope.data.lat, scope.data.lng);
              marker.setMap(null);
              marker = new google.maps.Marker({
                position:latLng,
                map:map
              });
              map.setCenter(marker.getPosition());
              scope.data.value = [scope.data.lat, scope.data.lng];
            }
          }
        }
      };
    };
  }]);
