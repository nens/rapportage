var rainMapWidget = function (StateService) {
  /**
  * rainMapWidgetLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @return {object}       - Object with angular config
  */
  var rainMapWidgetLink = function (scope, elem, attrs) {
    var updateScope = function () {
      scope.date = StateService.get('date');
    };

    scope.title = attrs.title;

    updateScope(StateService);

    StateService.on('change', updateScope, 'rainMapWidget');
  };

  return {
    link: rainMapWidgetLink,
    replace: true,
    restrict: 'E',
    scope: {},
    template: require('./rain-map-widget.html')
  };
};

module.exports = rainMapWidget;
