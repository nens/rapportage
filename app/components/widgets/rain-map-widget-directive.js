var rainMapWidget = function (StateService) {
  /**
  * rainMapWidgetLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @param  {object} attrs - contents of the attributes
  * @return {object}       - Object with angular config
  */
  var rainMapWidgetLink = function (scope, elem, attrs) {
    var updateScope = function () {
      scope.date = StateService.get('date');
    };

    scope.title = attrs.title;

    updateScope(StateService);

    StateService.on('change', updateScope, 'rainMapWidget' + scope.$id);
  };

  return {
    link: rainMapWidgetLink,
    replace: true,
    restrict: 'E',
    scope: {
      layers: '='
    },
    template: require('./rain-map-widget.html')
  };
};

module.exports = rainMapWidget;
