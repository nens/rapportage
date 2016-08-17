require('bootstrap-loader');

var angular = require('angular');

require('./components/branded-header/branded-header');
require('./components/state/state');
require('./components/widgets/widgets');

var app = angular.module('rapportage', [
  'brandedHeader',
  'state',
  'widgets'
]);

app.controller('MainCtrl', function ($scope, UrlUtil) {
  $scope.$watch('$routeUpdate', UrlUtil.updateStateWithUrl);
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
