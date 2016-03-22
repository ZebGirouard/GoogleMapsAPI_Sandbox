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
        /*
        for (var style in styles) {
          var name = style.name;
          var icon = style.icon;
          var div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + name;
          legend.appendChild(div);
        }
        */
        var features = [
          {
            position: new google.maps.LatLng(-33.91721, 151.22630),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91539, 151.22820),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91747, 151.22912),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91910, 151.22907),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91725, 151.23011),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91872, 151.23089),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91784, 151.23094),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91682, 151.23149),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91790, 151.23463),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91666, 151.23468),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.916988, 151.233640),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
            type: 'parking'
          }, {
            position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
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
