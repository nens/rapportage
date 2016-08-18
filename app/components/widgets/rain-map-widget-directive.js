var rainMapWidget = function () {
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
    scope.title = attrs.title;
  };

  return {
    link: rainMapWidgetLink,
    replace: true,
    restrict: 'E',
    scope: {
      layers: '=',
      bounds: '='
    },
    template: require('./rain-map-widget.html')
  };
};

module.exports = rainMapWidget;
