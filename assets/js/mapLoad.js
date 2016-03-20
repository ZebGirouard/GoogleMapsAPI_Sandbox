      var map;
      var mapKML;
      function initMap() {
        //GeoJSON Map
        var mapDiv = document.getElementById('map');
        map = new google.maps.Map(mapDiv, {
          center: {lat: 44.540, lng: -78.546},
          zoom: 8
        });
        //map.data.loadGeoJson('assets/usStates.json');
        var script = document.createElement('script');
        script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        document.getElementsByTagName('head')[0].appendChild(script);
        
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
      
      window.eqfeed_callback = function(response) {
          map.data.addGeoJson(response);
      }
