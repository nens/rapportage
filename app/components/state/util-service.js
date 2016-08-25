var BOUNDS = {
  Apeldoorn: {
    'bounds':
      {'northeast':{'lat':52.2503211,'lng':6.0582249},'southwest':{'lat':52.1725279,'lng':5.9013839}}
  }
};

var L = require('leaflet');
var UtilService = function ($http) {
  /**
   * getBounds - feed a city get a set of coordinates.
   *
   * @param  {string} city The name of a city
   * @return {promise}     A thennable promise with the response
   */
  this.getBounds = function (city) {
    var geom = BOUNDS.Apeldoorn;
    bounds = L.latLngBounds(
      L.latLng(geom.bounds.northeast.lat, geom.bounds.northeast.lng),
      L.latLng(geom.bounds.southwest.lat, geom.bounds.southwest.lng)
    );
    return bounds;
  };
};

module.exports = UtilService;
