require('bootstrap-loader');
require('font-awesome/css/font-awesome.css');

var angular = require('angular');
var angularRoute = require('angular-route');
var loadingBar = require('angular-loading-bar');

require('./components/branded-header/branded-header');
require('./components/state/state');
require('./components/widgets/widgets');
require('./components/modals/modals');

var app = angular.module('rain_report', [
  'brandedHeader',
  'state',
  'widgets',
  'modals',
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
      $scope.loading = true;
      var urlRegion = window.location.host.split('.')[0];
      if (urlRegion === "nxt3")  {
        urlRegion = window.location.host.split('.')[0] + "."  + window.location.host.split('.')[1];
      }
      $scope.region = urlRegion;
      // load config.json

      $http.get('config.json').then(function(res) {
        $scope.loading = false;
        var config = res.data;
        var siteConfig = config.sites[$scope.region];
        if (siteConfig) {
          $scope.modalActive = true;
        } else {
          $scope.modalActive = false;
          siteConfig = {
            "state": {
              "regionTitle": "Nederland",
              "bounds": {
                "northeast": {
                  "lat": 54.0,
                  "lng": 4.5
                },
                "southwest": {
                  "lat": 51.0,
                  "lng": 5.8
                }
              }
            },
            "monthlyMeans": [
              69,
              56,
              66,
              42,
              61,
              65,
              81,
              72,
              78,
              82,
              79,
              75
            ],
            "locations": []
          };
        }

        var now = new Date(Date.now());
        var month = (now.getMonth() + 1).toString();

        $scope.state = {
          regionTitle: siteConfig.state.regionTitle,
          date: new Date(Date.now()),
          month: new Array(3 - month.length).join("0") + month,
          year: now.getFullYear()
        };

        $scope.map = config.defaults;
        $scope.map.monthlyMeans = siteConfig.monthlyMeans;
        $scope.map.bounds = siteConfig.state.bounds;

        $scope.locations = siteConfig.locations;

        $scope.map.bounds = StateService.updateBounds($scope.map);

        var findExtremeRain = function () {
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
