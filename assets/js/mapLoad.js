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
        
        mapStyled = new google.maps.Map(document.getElementById('mapStyled'), {
          center: new google.maps.LatLng(37.790611, -122.391136),
          zoom: 2,
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
            featureType: 'poi.school',
            elementType: 'geometry',
            stylers: [
              { hue: '#fff700' },
              { lightness: -15 },
              { saturation: 99 }
            ]
          }
        ]);
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
