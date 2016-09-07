var L = require('leaflet');
var UtilService = function ($http) {
  /**
   * getBounds - feed a city get a set of coordinates.
   *
   * @param  {string} city The name of a city
   * @return {promise}     A thennable promise with the response
   */
  this.getBounds = function (geom) {
    bounds = L.latLngBounds(
      L.latLng(geom.bounds.northeast.lat, geom.bounds.northeast.lng),
      L.latLng(geom.bounds.southwest.lat, geom.bounds.southwest.lng)
    );
    return bounds;
  };
};

module.exports = UtilService;
