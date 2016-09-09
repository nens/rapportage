var rainRecurrence = ['ApiService', 'ExtremeRainService', function (ApiService, ExtremeRainService) {
  /**
  * rainRecurrenceLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @param  {object} attrs - contents of the attributes
  * @return {object}       - Object with angular config
  */
  var rainRecurrenceLink = function (scope) {
    scope.show = false;

    scope.toggleContent = function () {
      scope.show = !scope.show;
    };

    var updateScope = function () {
      var date = new Date(scope.date.getTime());
      var start = date.toISOString();
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      var stop = date.toISOString();
      ApiService.rainRecurrence(scope.location, scope.uuid, {
        start: start,
        stop: stop
      })
      .then(function (response) {
        scope.location.defer.resolve({
          stats: response,
          location: scope.location
        });
        scope.recurrenceData = response;
      });
    };

    scope.$watch('date', updateScope);
  };

  return {
    link: rainRecurrenceLink,
    replace: true,
    restrict: 'E',
    scope: {
      location: '=',
      date: '=',
      uuid: '=',
      rainTMax: '=',
      rainPromises: '='
    },
    template: require('./rain-recurrence.html')
  };
}];

module.exports = rainRecurrence;
