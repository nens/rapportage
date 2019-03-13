var L = require('leaflet');

var leafletMap = function () {
  /**
  * leafletMapLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @return {object}       - Object with angular config
  */

  var round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  var toLegendColors = function(legend){
    return legend.data.slice(1, legend.data.length).map(function(legendItem){
      return {
        title: round(legendItem[0], 2),
        style: { background: 'rgba(' + legendItem[1].toString() + ')' }
      }
    })
  };

  var icon = function (pxSize, location) {
    return L.divIcon({
      className: 'nens-div-icon',
      iconAnchor: [pxSize, pxSize],
      html: '<svg id="marker-{location}">'.replace(/\{location\}/g, location)
      + '<circle cx="8" cy="8" r="7" class="outer"/>'
      + '<circle cx="8" cy="8" r="2" class="inner"/>'
      + '</svg>'
    });
  };

  var leafletMapLink = function (scope, elem) {
    scope.$watch("mapConfig", function (mapConfig) {  // TODO: This is one of my uglier hacks thusfar. I recommend fixing this / discussing this.
      if (mapConfig) {
        var legends = {
          'radar-5min': toLegendColors(mapConfig.colorMaps.fiveMin),
          'radar-hour': toLegendColors(mapConfig.colorMaps.hour),
          'radar-day': toLegendColors(mapConfig.colorMaps.day),
          'radar-month': toLegendColors(mapConfig.colorMaps.month)
        };
        if (scope.type === 'month') scope.legendColors = legends['radar-month'];

        var mapEl = elem[0].querySelector('.map-element');
        var map = L.map(mapEl, {
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          dragging: false,
          keyboard: false,
          attributionControl: false
        });

        // add map background from tms layer:
        L.tileLayer(mapConfig.tmsUrl, {}).setZIndex(0).addTo(map);

        // create context layers:
        var markerLayer = L.layerGroup().setZIndex(30)
          .addTo(map);

        var rainLayer = L.layerGroup().setZIndex(20)
          .addTo(map);

        var drawMarkers = function () {
          if (scope.locations) {
            markerLayer.clearLayers();
            scope.locations.forEach(function (location) {
              var stripped = location.title.replace( /\s+/g, '' );
              L.marker(
                [location.geometry.lat, location.geometry.lng],
                {
                  title: location.title,
                  icon: icon(7, stripped)
                }
              ).addTo(markerLayer);
            })
          }
        };

        var updateRainLayer = function (start, stop) {
          // determine the timedelta and time
          var timeDelta = stop - start;
          var time = start.toISOString() + '/' + stop.toISOString();

          // determine temporalsum wrapper and corresponding style
          if (timeDelta < mapConfig.cutOffs.fiveMinuteCutOff) {
            var style = 'radar-5min';
            var layer = 'rain_temporal5min';
          } else if (timeDelta < mapConfig.cutOffs.hourCutOff) {
            var style = 'radar-hour';
            var layer = 'rain_temporal5min';
          } else if (timeDelta < mapConfig.cutOffs.dayCutOff) {
            var style = 'radar-day';
            var layer = 'rain_temporal5min';
          } else if (timeDelta < mapConfig.cutOffs.monthCutOff) {
            var style = 'radar-month';
            var layer = 'rain_temporalhour';
          } else {
            var style = 'radar-month';
            var layer = 'rain_temporalday';
          }
          scope.legendColors = legends[style].slice(
              0, legends[style].length - 1);

          // create the layer and add it to the map.
          rainLayer.clearLayers();
          L.tileLayer.wms(mapConfig.wmsUrl, {
              layers: layer,
              styles: style,
              format: 'image/png',
              time: time,
              transparent: true,
              opacity: 0.6,
              minZoom: 1,
              maxZoom: 18,
              zIndex: 20,
              unloadInvisibleTiles: true
            }).addTo(rainLayer);
        };

        var updateExtremeRain = function (rainTMax) {
          if (rainTMax && scope.type === 'recurrence') {
            // first highlight the right marker
            var markerId = '#marker-' + rainTMax.location.replace( /\s+/g, '' );
            if (markerId) {
              var selected = mapEl.querySelector('.selected');
              if (selected) {selected.classList.remove('selected');}
              mapEl
                .querySelector(markerId)
                .querySelector('.outer')
                .classList.add('selected');
            }
            // then add the corresponding rain layer
            var start = new Date(scope.rainTMax.start);
            var stop = new Date(scope.rainTMax.end);
            updateRainLayer(start, stop);
          }
        };

        var updateMapBounds = function (mapConfig) {
          var bounds = mapConfig.bounds;
           if (bounds) {
            map.fitBounds(bounds);
          }
        };

        var updateMonthlyRain = function (date) {
          if (scope.type === 'month') {
            var localDate = new Date(date);
            var start = new Date(localDate);
            localDate.setMonth(localDate.getMonth() + 1);
            localDate.setDate(0);
            var stop = localDate;
            updateRainLayer(start, stop);
          }
        };

        scope.$watch('locations', drawMarkers);
        scope.$watch('date', updateMonthlyRain);
        scope.$watch('rainTMax', updateExtremeRain);
        scope.$watch('mapConfig', updateMapBounds);
      }
    })
  };

  return {
    link: leafletMapLink,
    replace: true,
    restrict: 'E',
    scope: {
      type: '=',
      mapConfig: '=',
      rainTMax: '=',
      date: '=',
      locations: '='
    },
    template: require('./leaflet-map.html')
  };
};

module.exports = leafletMap;
