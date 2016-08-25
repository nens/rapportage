require('bootstrap-loader');

var angular = require('angular');
var angularRoute = require('angular-route');

require('./components/branded-header/branded-header');
require('./components/state/state');
require('./components/widgets/widgets');

var app = angular.module('rapportage', [
  'brandedHeader',
  'state',
  'widgets',
  angularRoute
]);

app.controller('MainCtrl', function ($scope, $route, UrlUtil, StateService) {

  $scope.state = {
    city: 'Apeldoorn',
    date: Date.now(),
    bounds: {},
    month: '08',
    year: '2015'
  };

  $scope.locations = [{
    title: 'location1',
    geometry: {
      lat: 5.4,
      lng: 51.2
    }
  },
  {
    title: 'location2',
    geometry: {
      lat: 5.4321,
      lng: 51.2125
    }
  }];

  $scope.state.bounds = StateService.updateBounds();

  var updateDate = function () {
   $scope.state.date = StateService.updateDate($scope.state);
  };

  $scope.state.date = StateService.updateDate($scope.state);

  $scope.$watch('state.month', updateDate);
  $scope.$watch('state.year', updateDate);

  $scope.layersMonthly = [
    {
      type: 'wms',
      url: 'https://raster.lizard.net/wms?',
      styles: 'radar-hour',
      layers: 'radar/hour',
      time: '2015-08-14T03:00:00'
    },
    {
      type: 'tms',
      url: 'http://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png'
    }
  ];

  $scope.layersMax = [
    {
      type: 'wms',
      url: 'https://raster.lizard.net/wms?',
      styles: 'radar-hour',
      layers: 'radar/hour',
      time: '2015-08-13T22:00:00'
    },
    {
      type: 'tms',
      url: 'http://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png'
    }
  ];
});

module.exports = app;
