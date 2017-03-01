var nv = require('nvd3');
var d3 = require('d3');
require('nvd3/build/nv.d3.css');

var rainGraphWidget = ['ApiService', function (ApiService) {
  /**
  * rainGraphWidgetLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @return {object}       - Object with angular config
  */
  var rainGraphWidgetLink = function (scope, elem) {
    var months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug',
      'sep', 'okt', 'nov', 'dec'];
    var chart = nv.models.multiBarChart()
      .x(function (d) { return months[new Date(d[0] - 1296000000).getUTCMonth()]; })
      .y(function (d) { return d[1] / scope.area; })
      .wrapLabels(true)
      .reduceXTicks(false)   // If 'false', every single x-axis tick label will be rendered.
      .showControls(false)   // Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1);   // Distance between each group of bars. // transitionDuration
    var chartPrint = nv.models.multiBarChart()
      .width(800)
      .x(function (d) { return months[new Date(d[0] - 1296000000).getUTCMonth()]; })
      .y(function (d) { return d[1] / scope.area; })
      .wrapLabels(true)
      .reduceXTicks(false)   // If 'false', every single x-axis tick label will be rendered.
      .showControls(false)   // Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1);   // Distance between each group of bars. // transitionDuration

    var doChart = function () {
      if (scope.bounds && scope.year && scope.monthlyMeans) {
        ApiService.getMonthlyRain(scope.bounds, scope.year, scope.uuid)
          .then(function (data) {
            d3.select(elem[0].children[0])
            .datum([{
              'key': 'Meerjaarlijks gemiddelde',
              'color': '#bdc3c7',
              'values': [
                [Date.parse('Jan 17 ' + scope.year), scope.monthlyMeans[0] * scope.area],
                [Date.parse('Feb 17 ' + scope.year), scope.monthlyMeans[1] * scope.area],
                [Date.parse('Mar 17 ' + scope.year), scope.monthlyMeans[2] * scope.area],
                [Date.parse('Apr 17 ' + scope.year), scope.monthlyMeans[3] * scope.area],
                [Date.parse('May 17 ' + scope.year), scope.monthlyMeans[4] * scope.area],
                [Date.parse('Jun 17 ' + scope.year), scope.monthlyMeans[5] * scope.area],
                [Date.parse('Jul 17 ' + scope.year), scope.monthlyMeans[6] * scope.area],
                [Date.parse('Aug 17 ' + scope.year), scope.monthlyMeans[7] * scope.area],
                [Date.parse('Sep 17 ' + scope.year), scope.monthlyMeans[8] * scope.area],
                [Date.parse('Oct 17 ' + scope.year), scope.monthlyMeans[9] * scope.area],
                [Date.parse('Nov 17 ' + scope.year), scope.monthlyMeans[10] * scope.area],
                [Date.parse('Dec 17 ' + scope.year), scope.monthlyMeans[11] * scope.area]
              ]
            }, {
              'key': 'Actuele maandsom',
              'color': '#16a085',
              'values': data
            }])
            .call(chart);
            d3.select(elem[0].children[1])
            .datum([{
              'key': 'Meerjaarlijks gemiddelde',
              'color': '#bdc3c7',
              'values': [
                [Date.parse('Jan 17 ' + scope.year), scope.monthlyMeans[0] * scope.area],
                [Date.parse('Feb 17 ' + scope.year), scope.monthlyMeans[1] * scope.area],
                [Date.parse('Mar 17 ' + scope.year), scope.monthlyMeans[2] * scope.area],
                [Date.parse('Apr 17 ' + scope.year), scope.monthlyMeans[3] * scope.area],
                [Date.parse('May 17 ' + scope.year), scope.monthlyMeans[4] * scope.area],
                [Date.parse('Jun 17 ' + scope.year), scope.monthlyMeans[5] * scope.area],
                [Date.parse('Jul 17 ' + scope.year), scope.monthlyMeans[6] * scope.area],
                [Date.parse('Aug 17 ' + scope.year), scope.monthlyMeans[7] * scope.area],
                [Date.parse('Sep 17 ' + scope.year), scope.monthlyMeans[8] * scope.area],
                [Date.parse('Oct 17 ' + scope.year), scope.monthlyMeans[9] * scope.area],
                [Date.parse('Nov 17 ' + scope.year), scope.monthlyMeans[10] * scope.area],
                [Date.parse('Dec 17 ' + scope.year), scope.monthlyMeans[11] * scope.area]
              ]
            }, {
              'key': 'Actuele maandsom',
              'color': '#16a085',
              'values': data
            }])
            .call(chartPrint);
          }
        );
      }
    };

    nv.addGraph(function () {
      // TODO: when monthly rain amount is correct fix axis below.
      chart.showYAxis(false);
      chart.yAxis
      .tickFormat(d3.format(',.1f'))
      .axisLabel('Regen (mm)');

      chartPrint.showYAxis(false);
      chartPrint.yAxis
      .tickFormat(d3.format(',.1f'))
      .axisLabel('Regen (mm)');

      doChart();

      nv.utils.windowResize(doChart);

      return chart;
    });
    doChart();

    scope.$watch('year', doChart);
    scope.$watch('bounds', doChart);
    scope.$watch('monthlyMeans', doChart);
  };

  return {
    link: rainGraphWidgetLink,
    replace: true,
    restrict: 'E',
    scope: {
      year: '=',
      bounds: '=',
      monthlyMeans: '=',
      uuid: '=',
      area: '='
    },
    template: require('./rain-graph.html')
  };
}];

module.exports = rainGraphWidget;
