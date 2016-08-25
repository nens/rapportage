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
    var months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug',
      'sep', 'okt', 'nov', 'dec'];
    var chart = nv.models.multiBarChart()
      .x(function (d) { return months[new Date(d[0] + 1296000000).getUTCMonth()]; })
      .y(function (d) { return d[1] / 265254071 * 1000; })
      .wrapLabels(true)
      .reduceXTicks(false)   // If 'false', every single x-axis tick label will be rendered.
      .showControls(false)   // Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1);   // Distance between each group of bars. // transitionDuration

    var doChart = function () {
      if (scope.bounds && scope.year) {
        console.log(elem[0], scope.bounds, scope.year);
        ApiService.getMonthlyRain(scope.bounds, scope.year).then(function (data) {
          d3.select(elem[0])
          .datum([{
            'key': 'Meerjaarlijks gemiddelde',
            'color': '#bdc3c7',
            'values': [
              [Date.parse('Jan 1 2016'), 1 * 265254],
              [Date.parse('Feb 1 2016'), 1 * 265254],
              [Date.parse('Mar 1 2016'), 1 * 265254],
              [Date.parse('Apr 1 2016'), 1 * 265254],
              [Date.parse('May 1 2016'), 1 * 265254],
              [Date.parse('Jun 1 2016'), 1 * 265254],
              [Date.parse('Jul 1 2016'), 1 * 265254],
              [Date.parse('Aug 1 2016'), 1 * 265254],
              [Date.parse('Sep 1 2016'), 1 * 265254],
              [Date.parse('Oct 1 2016'), 1 * 265254],
              [Date.parse('Nov 1 2016'), 1 * 265254],
              [Date.parse('Dec 1 2016'), 1 * 265254]
            ]
          }, {
            'key': 'timeseries',
            'color': '#16a085',
            'values': data
          }])
          .call(chart);
        });
      }
    };

    nv.addGraph(function () {
      chart.yAxis
      .tickFormat(d3.format(',.1f'));

      doChart();

      nv.utils.windowResize(doChart);

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
