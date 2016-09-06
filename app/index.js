require('bootstrap-loader');

var angular = require('angular');
var angularRoute = require('angular-route');
var loadingBar = require('angular-loading-bar');

require('./components/branded-header/branded-header');
require('./components/state/state');
require('./components/widgets/widgets');

var app = angular.module('rapportage', [
  'brandedHeader',
  'state',
  'widgets',
  angularRoute,
  loadingBar
]);

app.controller('MainCtrl', function ($q, $scope, $route, UrlUtil, StateService, ExtremeRainService) {

  $scope.state = {
    city: 'Apeldoorn',
    date: Date.now(),
    bounds: {},
    month: '08',
    year: '2015'
  };

  $scope.locations = [
    {
      title: 'Stadsdeel NoordOost',
      geometry: {
        lng: 5.9987068,
        lat: 52.2266165
      }
    }, {
      title: 'Stadsdeel ZuidOost',
      geometry: {
        lng: 5.9999084,
        lat: 52.1986642
      }
    }, {
      title: 'Stadsdeel ZuidWest',
      geometry: {
        lng: 5.9569073,
        lat: 52.1902462
      }
    }, {
      title: 'Stadsdeel NoordWest',
      geometry: {
        lng: 5.9397411,
        lat: 52.2198076
      }
    }, {
      title: 'Centrum',
      geometry: {
        lng: 5.9630442,
        lat: 52.2129713
      }
    }, {
      title: 'Beekbergen',
      geometry: {
        lng: 5.9650183,
        lat: 52.1613233}
    }, {
      title: 'Uddel',
      geometry: {
        lng: 5.7817268,
        lat: 52.2588068
      }
    }, {
      title: 'Hoenderlo',
      geometry: {
        lng: 5.8806038,
        lat: 52.118075
      }
    }, {
      title: 'Loenen',
      geometry: {
        lng: 6.0208082,
        lat: 52.1171791
      }
    }];

  $scope.state.bounds = StateService.updateBounds();

  var findExtremeRain = function(){
    $scope.state.rainStats = [];
    $scope.locations = $scope.locations.map(function (location) {
      location.defer = $q.defer();
      $scope.state.rainStats.push(location.defer.promise);
      return location;
    });
    $q.all($scope.state.rainStats).then(function (allRain) {
      $scope.state.rainTMax = ExtremeRainService.maxRain(allRain);
    });
  };

  findExtremeRain();

  var refresh = function () {
    $scope.state.date = StateService.updateDate($scope.state);
    findExtremeRain();
  };

  $scope.month = "month";
  $scope.recurrence = "recurrence";


  $scope.state.date = StateService.updateDate($scope.state);

  $scope.$watch('state.month', refresh);
  $scope.$watch('state.year', refresh);

});

module.exports = app;
