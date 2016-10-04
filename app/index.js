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

app.controller('MainCtrl', [
  '$q',
  '$scope',
  '$http',
  '$route',
  'UrlUtil',
  'StateService',
  'ExtremeRainService',
  function ($q, $scope, $http, $route, UrlUtil, StateService, ExtremeRainService) {
  // load config.json
  $http.get('config.json')
    .then(function(res){
      var config = res.data;
      $scope.region = window.location.host.split('.')[0];
      var siteConfig = config.sites[$scope.region];
      console.log(siteConfig);

      var now = new Date(Date.now());
      var month = (now.getMonth() + 1).toString();

      $scope.state = {
        city: siteConfig.state.regionTitle,
        date: Date.now(),
        month: "0".repeat(2 - month.length) + month,
        year: now.getFullYear()
      };

      $scope.map = config.defaults;
      $scope.map.monthlyMeans = siteConfig.monthlyMeans;
      $scope.map.bounds = siteConfig.state.bounds;

      $scope.locations = siteConfig.locations;

      $scope.map.bounds = StateService.updateBounds($scope.map);

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
}]);

module.exports = app;
