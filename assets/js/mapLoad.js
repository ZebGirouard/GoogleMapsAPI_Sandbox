      var map;
      var mapKML;
      var mapStyled;
      
      function eqfeed_callback(response) {
        var heatmapData = [];
        for (var i = 0; i < response.features.length; i++) {
          var coords = response.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1], coords[0]);
          var magnitude = response.features[i].properties.mag;
          var weightedLoc = {
            location: latLng,
            weight: Math.pow(2, magnitude)
          };
          heatmapData.push(weightedLoc);
        }
        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          dissipating: false,
          map: map
        });
        //map.data.addGeoJson(response); //Simple Pin Drops
      }
      
      //Add Circle Style
      function getCircle(magnitude) {
        var circle = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
        return circle;
      }
      
      function initMap() {
        //GeoJSON Map
        var mapOptions = {
          zoom: 2,
          center: {lat: -33.865427, lng: 151.196123},
          mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var mapDiv = document.getElementById('map');
        map = new google.maps.Map(mapDiv, mapOptions);
        //map.data.loadGeoJson('assets/usStates.json'); //Input GeoJson file data
        var script = document.createElement('script');
        script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        document.getElementsByTagName('head')[0].appendChild(script);
        
        /* Add Circle Style 
        map.data.setStyle(function(feature) {
          var magnitude = feature.getProperty('mag');
          return {
            icon: getCircle(magnitude)
          };
        }); */  
        
        //Styled Map
        var myLatLng = {lat: 37.790611, lng: -122.391136};
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };
        
        mapStyled = new google.maps.Map(document.getElementById('mapStyled'), {
          center: new google.maps.LatLng(myLatLng),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });  
        
        mapStyled.set('styles', [
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              { color: '#000000' },
              { weight: 1.6 }
            ]
          }, {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              { saturation: -100 },
              { invert_lightness: true }
            ]
          }, {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              { hue: '#ffff00' },
              { gamma: 1.4 },
              { saturation: 82 },
              { lightness: 96 }
            ]
          }, {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'off' }
            ]
          }, {
            featureType: 'poi.school',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { hue: '#fff700' },
              { lightness: -15 },
              { saturation: 99 }
            ]
          }
        ]);
        /*
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: mapStyled,
          icon: iconBase + 'schools_maps.png'
        });
        */
        mapStyled.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('legend'));
        
        var legend = document.getElementById('legend');
        
        var styles = {
          parking: {
            name: 'Parking',
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            name: 'Library',
            icon: iconBase + 'library_maps.png'
          },
          info: {
            name: 'Info',
            icon: iconBase + 'info-i_maps.png'
          }
        };
      
        for (var key in styles) {
          var style = styles[key];
          var name = style.name;
          var icon = style.icon;
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + name;
          legend.appendChild(div);
        }
        
        var features = [
          {
            position: new google.maps.LatLng(37.790811, -122.391136),
            type: 'info'
          }, {
            position: new google.maps.LatLng(37.790411, -122.391136),
            type: 'info'
          }, {
            position: new google.maps.LatLng(37.791011, -122.391136),
            type: 'info'
          }, {
            position: new google.maps.LatLng(37.790211, -122.391136),
            type: 'info'
          }, {
            position: new google.maps.LatLng(37.790611, -122.390936),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-37.790611, -122.391336),
            type: 'info'
          }, {
            position: new google.maps.LatLng(37.790611, -122.391536),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-37.790611, -122.390736),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(37.790611, -122.390536),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(37.790611, -122.391736),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(37.780611, -122.391136),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(37.800611, -122.391136),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(37.790611, -122.381136),
            type: 'library'
          }
        ];
        
        function addMarker(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: mapStyled
          });
        }
        for (var i = 0; i < features.length; i++) {
              addMarker(features[i]);
        }
        
        //KML Map
        mapKML = new google.maps.Map(document.getElementById('mapKML'), {
          center: new google.maps.LatLng(-19.257753, 146.823688),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });  
        var kmlUrl = 'https://developers.google.com/maps/tutorials/kml/westcampus.kml';
        var kmlOptions = {
          suppressInfoWindows: true,
          preserveViewport: false,
          map: mapKML
        };
        var kmlLayer = new google.maps.KmlLayer(kmlUrl, kmlOptions);
        google.maps.event.addListener(kmlLayer, 'click', function(event) {
          var content = event.featureData.infoWindowHtml;
          var testimonial = document.getElementById('capture');
          testimonial.innerHTML = content;
        });
      }
