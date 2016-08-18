var rainRecurrence = function (ApiService) {
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
      var date = scope.date;
      var start = date.toISOString();
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      var stop = date.toISOString();
      ApiService.rainRecurrence(scope.location, {
        start: start,
        stop: stop
      })
      .then(function (response) {
        scope.recurrenceData = response;
      });
    };

    scope.$watch('date', updateScope);

    updateScope();
  };

  return {
    link: rainRecurrenceLink,
    replace: true,
    restrict: 'E',
    scope: {
      location: '=',
      date: '='
    },
    template: require('./rain-recurrence.html')
  };
};

module.exports = rainRecurrence;
