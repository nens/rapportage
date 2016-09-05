var angular = require('angular');

angular.module('api', [])
.service('ApiService', function ($http) {
  var RAIN_RASTER_STORE_UUID = "49ff8d0";

  var RRC_BASE_URL = '/api/v2/raster-aggregates/?' +
    'agg=rrc&' +
    'geom=POINT+({lng}+{lat})&' +
    'rasters=' + RAIN_RASTER_STORE_UUID + '&' +
    'srs=EPSG:4326&' +
    'start={start_date}&' +
    'stop={stop_date}&' +
    'window=1200000';

  var rainRecurrence = function (location, date) {
    var url = RRC_BASE_URL
    .replace('{lng}', location.geometry.lng)
    .replace('{lat}', location.geometry.lat)
    .replace('{start_date}', date.start)
    .replace('{stop_date}', date.stop);
    return $http.get(url).then(function (response) {
      return response.data.data;
    }, function () {
      // this is the error callback but now returns the dummy
      console.log('No rain data found.')
    });
  };

  var RAIN_BASE_URL = '/api/v2/raster-aggregates/?agg=sum&geom='
  + 'POLYGON(('
  + '{west}+{south},+'
  + '{east}+{south},+'
  + '{east}+{north},+'
  + '{west}+{north},+'
  + '{west}+{south}))&'
  + 'rasters=' + RAIN_RASTER_STORE_UUID
  + '&srs=EPSG:4326&'
  + 'start={start}-12-31T23:00:00&'
  + 'stop={stop}-12-31T23:00:00&'
  + 'window=2635200000';
  var getMonthlyRain = function (bounds, year) {
    var north = bounds._northEast.lat;
    var east = bounds._northEast.lng;
    var south = bounds._southWest.lat;
    var west = bounds._southWest.lng;
    var url = RAIN_BASE_URL
    .replace('{start}', year - 1) // year starts a few hours before our year -- timezones
    .replace('{stop}', year) // year starts a few hours before our year -- timezones
    .replace(/\{north\}/g, north)
    .replace(/\{south\}/g, south)
    .replace(/\{east\}/g, east)
    .replace(/\{west\}/g, west);
    return $http.get(url).then(function (response) {
      return response.data.data;
    }, function () {
      // this is the error callback but now returns the dummy
      console.log('Monthly rain data not found.');
      return { data: [] };
    });
  };

  return {
    rainRecurrence: rainRecurrence,
    getMonthlyRain: getMonthlyRain
  }
});
