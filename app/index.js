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
  $scope.state = {};

  var updateStateWithUrl = function () {
    $scope.fromUrl = true;
    angular.extend($scope.state, UrlUtil.updateStateWithUrl());
    // otherwise anglar doesn't register the change. This is called
    // from a non-angular event handler
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  };

  var updateDate = function () {
    $scope.state.date = StateService.updateDate($scope.state);

    if ($scope.fromUrl) {
      UrlUtil.updateUrlWithState($scope.state);
    }
    $scope.fromUrl = false;
  };

  var updateBounds = function (city) {
    StateService.updateBounds(city).then(function (bounds) {
      $scope.state.bounds = bounds;
    });
  };

  updateStateWithUrl();
  updateDate();
  updateBounds();

  // default values
  if (angular.equals($scope.state, {})) {
    $scope.state = {
      reportType: 'neerslag',
      city: 'Utrecht',
      year: '2016',
      month: '08'
    };
  }

  window.addEventListener('hashchange', updateStateWithUrl);
  $scope.$watch('state.month', updateDate);
  $scope.$watch('state.year', updateDate);
  $scope.$watch('state.city', updateBounds);


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

  $scope.layersMonthly = [
    {
      type: 'wms',
      url: 'https://raster.lizard.net/wms?',
      styles: 'radar-hour',
      layers: 'radar/hour',
      time: '2016-08-17T11:00:00'
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
      time: '2016-08-17T11:00:00'
    },
    {
      type: 'tms',
      url: 'http://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png'
    }
  ];
});

module.exports = app;
