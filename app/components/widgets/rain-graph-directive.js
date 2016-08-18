var nv = require('nvd3');
var d3 = require('d3');
require('nvd3/build/nv.d3.css');

var rainGraphWidget = function (ApiService) {
  /**
  * rainGraphWidgetLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @param  {object} attrs - contents of the attributes
  * @return {object}       - Object with angular config
  */
  var rainGraphWidgetLink = function (scope, elem) {
    var chart = nv.models.multiBarChart()
      .x(function (d) { return Date.parse(d[0]); })
      .y(function (d) {
        console.log(d)
        return d[1];
      })
      .reduceXTicks(true)   // If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      // Angle to rotate x-axis labels.
      .showControls(true)   // Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1);   // Distance between each group of bars. // transitionDuration

    var doChart = function () {
      if (scope.bounds && scope.year) {
        console.log(elem[0])
        ApiService.getMonthlyRain(scope.bounds, scope.year).then(function (data) {
          d3.select(elem[0])
          .datum([{
            'key': 'timeseries',
            'values': data
          }])
          .call(chart);
        });
      }
    };

    nv.addGraph(function () {
      chart.xAxis
      .tickFormat(d3.format(',f'));

      chart.yAxis
      .tickFormat(d3.format(',.1f'));

      doChart();

      nv.utils.windowResize(chart.update);

      return chart;
    });

    scope.$watch('year', doChart);
    scope.$watch('bounds', doChart);
  };

  return {
    link: rainGraphWidgetLink,
    replace: true,
    restrict: 'E',
    scope: {
      year: '=',
      bounds: '='
    },
    template: require('./rain-graph.html')
  };
};

module.exports = rainGraphWidget;
