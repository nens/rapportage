var mapLegend = function () {

  return {
    replace: true,
    restrict: 'E',
    scope: {
      legendColorStyle: '='
    },
    template: require('./map-legend.html')
  };
};

module.exports = mapLegend;