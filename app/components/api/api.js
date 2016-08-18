var angular = require('angular');

var rrcdummy = {
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

var monthlydummy =
  {
    data: [
      [
        1422604800000,
        8921939
      ],
      [
        1425196800000,
        5222430
      ],
      [
        1427788800000,
        5248264.5
      ],
      [
        1430380800000,
        3117649.25
      ],
      [
        1432972800000,
        4556518
      ],
      [
        1435564800000,
        5543164.5
      ],
      [
        1438156800000,
        9270525
      ],
      [
        1440748800000,
        11562284
      ],
      [
        1443340800000,
        10906363
      ],
      [
        1445932800000,
        3890606.75
      ],
      [
        1448524800000,
        8597862
      ],
      [
        1451116800000,
        7674221
      ]
    ]
  };

angular.module('api', [])
.service('ApiService', function ($http) {
  var RRC_BASE_URL = 'https://demo.lizard.net/api/v2/raster-aggregates/?agg=rrc&geom=POINT({lng}+{lat})&raster_names=rain&srs=EPSG:4326&start={start_date}&stop={stop_date}&window=3600000';

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
      return rrcdummy.data;
    });
  };

  var RAIN_BASE_URL = 'https://demo.lizard.net/api/v2/raster-aggregates/?agg=sum&geom='
  + 'POLYGON(('
  + '{west}+{south},+'
  + '{east}+{south},+'
  + '{east}+{north},+'
  + '{west}+{north},+'
  + '{west}+{south}))&raster_names=rain&srs=EPSG:4326&start={start}-12-31T23:00:00&stop={stop}-12-31T23:00:00&window=2635200000';
  var getMonthlyRain = function (bounds, year) {
    var north = bounds._northEast.lat;
    var east = bounds._northEast.lng;
    var south = bounds._southWest.lng;
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
      return monthlydummy.data;
    });
  };

  return {
    rainRecurrence: rainRecurrence,
    getMonthlyRain: getMonthlyRain
  }
});
