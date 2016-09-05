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

    var markerLayer = L.layerGroup()
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

    var updateMarkers = function (rainTMax) {
      if (rainTMax) {
        var markerId = '#marker-' + rainTMax.location.replace( /\s+/g, '' );
        if (markerId) {
          var selected = mapEl.querySelector('.selected');
          if (selected) {selected.classList.remove('selected');}
          mapEl
            .querySelector(markerId)
            .querySelector('.outer')
            .classList.add('selected');
        }
      }
    };

    var updateMapBounds = function (bounds) {
      if (bounds) {
        map.fitBounds(bounds);
      }
    };

    scope.layers.forEach(function (layer) {
      if (layer.type === 'tms') {
        L.tileLayer(layer.url, {
        }).addTo(map);
      } else if (layer.type === 'wms') {
        L.tileLayer.wms(layer.url, {
          layers: layer.layers,
          styles: layer.styles,
          format: 'image/png',
          time: layer.time,
          transparent: true,
          opacity: 0.6,
          minZoom: 1,
          maxZoom: 18,
          zIndex: 20,
          unloadInvisibleTiles: true
        }).addTo(map);
      }
      drawMarkers();
    });

    scope.$watch('rainTMax', updateMarkers);
    scope.$watch('bounds', updateMapBounds);
  };

  return {
    link: leafletMapLink,
    replace: true,
    restrict: 'E',
    scope: {
      layers: '=',
      bounds: '=',
      rainTMax: '=',
      locations: '='
    },
    template: require('./leaflet-map.html')
  };
};

module.exports = leafletMap;
