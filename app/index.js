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

app.controller('MainCtrl', function (UrlUtil) {
  UrlUtil.updateStateWithUrl();
});

module.exports = app;
