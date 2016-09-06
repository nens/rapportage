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

  // configuration:
  var wmsUrl = '/api/v2/wms?';
  var tmsUrl =
    'http://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png';
  var fiveMinuteCutOff = 5 * 60 * 1000 + 1;
  var hourCutOff = 2 * 60 * 60 * 1000;
  var dayCutOff = 2 * 24 * 3600 * 1000;
  var monthCutOff = 28 * 24 * 3600 * 1000;
  var legend5min = {
    "type": "GradientColormap",
    "free": false,
    "log": true,
    "data": [
        [0.0009, [255, 255, 255,   0]],
        [0.0010, [255, 255, 255,  26]],
        [0.0100, [189, 195, 199, 255]],
        [0.0500, [ 52, 152, 219, 255]],
        [0.2000, [ 41, 128, 185, 255]],
        [0.5000, [141, 162, 100, 255]],
        [1.0000, [241, 196,  15, 255]],
        [1.5000, [231,  76,  60, 255]],
        [2.5000, [193,  82, 121, 255]],
        [5.0000, [155,  89, 182, 255]],
        [6.0000, [155,  89, 182, 255]]
    ]
  };
  var legendHour = {
    "type": "GradientColormap",
    "free": false,
    "log": true,
    "data": [
        [ 0.019, [255, 255, 255,   0]],
        [ 0.020, [255, 255, 255,  26]],
        [ 0.200, [189, 195, 199, 255]],
        [ 0.500, [ 52, 152, 219, 255]],
        [ 1.000, [ 41, 128, 185, 255]],
        [ 2.500, [141, 162, 100, 255]],
        [ 5.000, [241, 196,  15, 255]],
        [ 7.500, [231,  76,  60, 255]],
        [15.000, [193,  82, 121, 255]],
        [30.000, [155,  89, 182, 255]],
        [31.000, [155,  89, 182, 255]]
    ]
  };
  var legendDay = {
    "type": "GradientColormap",
    "free": false,
    "log": true,
    "data": [
        [ 0.049, [255, 255, 255,   0]],
        [ 0.050, [255, 255, 255,  26]],
        [ 0.500, [189, 195, 199, 255]],
        [ 2.000, [ 52, 152, 219, 255]],
        [ 2.500, [ 41, 128, 185, 255]],
        [ 5.000, [141, 162, 100, 255]],
        [10.000, [241, 196,  15, 255]],
        [20.000, [231,  76,  60, 255]],
        [30.000, [193,  82, 121, 255]],
        [50.000, [155,  89, 182, 255]],
        [51.000, [155,  89, 182, 255]]
    ]
  };
  var legendMonth = {
    "type": "GradientColormap",
    "free": false,
    "log": true,
    "data": [
        [ 0.049 * 30.5, [255, 255, 255,   0]],
        [ 0.050 * 30.5, [255, 255, 255,  26]],
        [ 0.500 * 30.5, [189, 195, 199, 255]],
        [ 2.000 * 30.5, [ 52, 152, 219, 255]],
        [ 2.500 * 30.5, [ 41, 128, 185, 255]],
        [ 5.000 * 30.5, [141, 162, 100, 255]],
        [10.000 * 30.5, [241, 196,  15, 255]],
        [20.000 * 30.5, [231,  76,  60, 255]],
        [30.000 * 30.5, [193,  82, 121, 255]],
        [50.000 * 30.5, [155,  89, 182, 255]],
        [51.000 * 30.5, [155,  89, 182, 255]]
    ]
  };

  var toLegendColors = function(legend){
    return legend.data.map(function(legendItem){
      return {
        title: legendItem[0],
        style: { background: 'rgba(' + legendItem[1].toString() + ')' }
      }
    })
  };

  var legends = {
    'radar-5min': toLegendColors(legend5min),
    'radar-hour': toLegendColors(legendHour),
    'radar-day': toLegendColors(legendDay),
    'radar-month': toLegendColors(legendMonth)
  };

  var icon = function (pxSize, location) {
    return L.divIcon({
      className: 'nens-div-icon',
      iconAnchor: [pxSize, pxSize],
      html: '<svg id="marker-{location}">'.replace(/\{location\}/g, location)
      + '<circle class="outer"/>'
      + '<circle class="inner"/>'
      + '</svg>'
    });
  };

  var leafletMapLink = function (scope, elem) {
    console.log(scope.type);
    scope.legendColors = [
      { background: 'blue' },
      { background: 'red' },
      { background: 'yellow' }
    ];

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
    L.tileLayer(tmsUrl, {}).addTo(map);

    // create context layers:
    var markerLayer = L.layerGroup()
      .addTo(map);

    var rainLayer = L.layerGroup()
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

    // markers can be drawn now:
    drawMarkers();

    var updateRainLayer = function (start, stop) {
      // determine the timedelta and time
      var timeDelta = stop - start;
      var time = start.toISOString() + '/' + stop.toISOString();
      console.log(time);

      // determine temporalsum wrapper and corresponding style
      if (timeDelta < fiveMinuteCutOff) {
        var style = 'radar-5min';
        var layer = 'radar/temporalsum_5min';
      } else if (timeDelta < hourCutOff) {
        var style = 'radar-hour';
        var layer = 'radar/temporalsum_5min';
      } else if (timeDelta < dayCutOff) {
        var style = 'radar-day';
        var layer = 'radar/temporalsum_5min';
      } else if (timeDelta < monthCutOff) {
        var style = 'radar-month';
        var layer = 'radar/temporalsum_hour';
      } else {
        var style = 'radar-month';
        var layer = 'radar/temporalsum_day';
      }
      var legend = legends[style];

      console.log(style, layer);

      // create the layer and add it to the map.
      rainLayer.clearLayers();
      L.tileLayer.wms(wmsUrl, {
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
      console.log(scope.date, scope.rainTMax, scope.type);
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

    var updateMapBounds = function (bounds) {
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

    scope.$watch('date', updateMonthlyRain);
    scope.$watch('rainTMax', updateExtremeRain);
    scope.$watch('bounds', updateMapBounds);
  };

  return {
    link: leafletMapLink,
    replace: true,
    restrict: 'E',
    scope: {
      type: '=',
      bounds: '=',
      rainTMax: '=',
      date: '=',
      locations: '='
    },
    template: require('./leaflet-map.html')
  };
};

module.exports = leafletMap;
