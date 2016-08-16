var angular = require('angular');
angular.module('state', [])
  .service('UrlUtil', require('./url-util'))
  .service('StateService', require('./state-service'));
