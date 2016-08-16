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
    var map = L.map(elem[0]).setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  };

  return {
    link: leafletMapLink,
    replace: true,
    restrict: 'E',
    scope: {
      layers: '='
    },
    template: require('./leaflet-map.html')
  };
};

module.exports = leafletMap;
