var L = require('leaflet');
var UtilService = function ($http) {
  /**
   * getBounds - feed a city get a set of coordinates.
   *
   * @param  {string} city The name of a city
   * @return {promise}     A thennable promise with the response
   */
  this.getBounds = function (city) {
    return $http.get(
      'https://maps.googleapis.com/maps/api/geocode/json?address='
      + city
      + '&bounds=49.63206194128714,-0.054931640625%7C54.59752785211386,10.601806640625&language=nl'
    ).then(function (response) {
      var bounds;
      if (response.data.results[0]) {
        var geom = response.data.results[0].geometry;
        bounds = L.latLngBounds(
          L.latLng(geom.bounds.northeast.lat, geom.bounds.northeast.lng),
          L.latLng(geom.bounds.southwest.lat, geom.bounds.southwest.lng)
        );
      }
      return bounds;
    });
  };
};

module.exports = UtilService;
