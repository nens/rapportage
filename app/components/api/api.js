var angular = require('angular');

var dummy = {
  data: [
    {
      start: 1471251784000,
      end: 1471424584000,
      t: '-',
      td_window: '2 dagen',
      max: 0.18000000715255737
    },
    {
      max: 0.17999999597668648,
      end: 1471420800000,
      t: 'T <= 1',
      td_window: '2 dag(en)',
      start: 1471248000000
    },
    {
      max: 0.1699999962002039,
      end: 1471420800000,
      t: 'T <= 1',
      td_window: '1 dag(en)',
      start: 1471334400000
    },
    {
      max: 0.1699999962002039,
      end: 1471420800000,
      t: 'T <= 1',
      td_window: '3 uur',
      start: 1471410000000
    },
    {
      max: 0.1599999964237213,
      end: 1471417200000,
      t: 'T <= 1',
      td_window: '1 uur',
      start: 1471413600000
    }
  ]
};

angular.module('api', [])
.service('ApiService', function ($http) {
  var RRC_BASE_URL = 'https://demo.lizard.net/api/v2/raster-aggregates/?agg=rrc&geom=POINT({lng}+{lat})&raster_names=rain&srs=EPSG:4326&start={start_date}&stop={stop_date}&window=3600000'
  this.rainRecurrence = function (location, date) {
    var url = RRC_BASE_URL
    .replace('{lng}', location.geometry.lng)
    .replace('{lat}', location.geometry.lat)
    .replace('{start_date}', date.start)
    .replace('{stop_date}', date.stop);
    return $http.get(url).then(function (response) {
      return response.data.data;
    }, function (err) {
      // this is the error callback but now returns the dummy
      return dummy.data;
    });
  };
});
