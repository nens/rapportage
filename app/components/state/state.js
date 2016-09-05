var angular = require('angular');
angular.module('state', [])
  .service('UrlUtil', require('./url-util'))
  .service('UtilService', require('./util-service'))
  .service('StateService', require('./state-service'))
  .service('ExtremeRainService', require('./extreme-rain-service'));
