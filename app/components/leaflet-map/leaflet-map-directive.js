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
  var leafletMapLink = function (scope, elem) {
    var map = L.map(elem[0], {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      keyboard: false,
      attributionControl: false
    });
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
          minZoom: 1,
          maxZoom: 18,
          zIndex: 20,
          unloadInvisibleTiles: true
        }).addTo(map);
      }
    });

    scope.$watch('bounds', updateMapBounds);
  };

  return {
    link: leafletMapLink,
    replace: true,
    restrict: 'E',
    scope: {
      layers: '=',
      bounds: '='
    },
    template: require('./leaflet-map.html')
  };
};

module.exports = leafletMap;
