var rainRecurrence = function (StateService) {
  /**
  * rainRecurrenceLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @param  {object} attrs - contents of the attributes
  * @return {object}       - Object with angular config
  */
  var rainRecurrenceLink = function (scope, elem, attrs) {
    scope.show = false;

    scope.toggleContent = function () {
      scope.show = !scope.show;
    };
  };

  return {
    link: rainRecurrenceLink,
    replace: true,
    restrict: 'E',
    scope: {
      location: '='
    },
    template: require('./rain-recurrence.html')
  };
};

module.exports = rainRecurrence;
