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
  * @param  {object} attrs - contents of the attributes
  * @return {object}       - Object with angular config
  */
  var SIZE = 1200;  // TODO: fix this when raster-store is fixed
  var rainGraphWidgetLink = function (scope, elem) {
    var months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug',
      'sep', 'okt', 'nov', 'dec'];
    var chart = nv.models.multiBarChart()
      .x(function (d) { return months[new Date(d[0] - 1296000000).getUTCMonth()]; })
      .y(function (d) { return d[1] / SIZE; })
      // TODO: ^-- SIZE = 1200 was picked as a hack that seems to give a
      // TODO:     correct value. This hack is used because the raster-store
      // TODO:     has a bug. This should be improved when the raster-store
      // TODO:     is fixed.
      .wrapLabels(true)
      .reduceXTicks(false)   // If 'false', every single x-axis tick label will be rendered.
      .showControls(false)   // Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1);   // Distance between each group of bars. // transitionDuration
    var chartPrint = nv.models.multiBarChart()
      .width(850)
      .x(function (d) { return months[new Date(d[0] - 1296000000).getUTCMonth()]; })
      .y(function (d) { return d[1] / SIZE; })
      // TODO: ^-- SIZE = 1200 was picked as a hack that seems to give a
      // TODO:     correct value. This hack is used because the raster-store
      // TODO:     has a bug. This should be improved when the raster-store
      // TODO:     is fixed.
      .wrapLabels(true)
      .reduceXTicks(false)   // If 'false', every single x-axis tick label will be rendered.
      .showControls(false)   // Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1);   // Distance between each group of bars. // transitionDuration

    var doChart = function () {
      // if (scope.bounds && scope.year && scope.monthlyMeans) {
        ApiService.getMonthlyRain(scope.bounds, scope.year, scope.uuid)
          .then(function (data) {
            d3.select(elem[0].children[0])
            .datum([{
              'key': 'Meerjaarlijks gemiddelde',
              'color': '#bdc3c7',
              'values': [
                [Date.parse('Jan 17 2016'), scope.monthlyMeans[0] * SIZE],
                [Date.parse('Feb 17 2016'), scope.monthlyMeans[1] * SIZE],
                [Date.parse('Mar 17 2016'), scope.monthlyMeans[2] * SIZE],
                [Date.parse('Apr 17 2016'), scope.monthlyMeans[3] * SIZE],
                [Date.parse('May 17 2016'), scope.monthlyMeans[4] * SIZE],
                [Date.parse('Jun 17 2016'), scope.monthlyMeans[5] * SIZE],
                [Date.parse('Jul 17 2016'), scope.monthlyMeans[6] * SIZE],
                [Date.parse('Aug 17 2016'), scope.monthlyMeans[7] * SIZE],
                [Date.parse('Sep 17 2016'), scope.monthlyMeans[8] * SIZE],
                [Date.parse('Oct 17 2016'), scope.monthlyMeans[9] * SIZE],
                [Date.parse('Nov 17 2016'), scope.monthlyMeans[10] * SIZE],
                [Date.parse('Dec 17 2016'), scope.monthlyMeans[11] * SIZE]
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
                [Date.parse('Jan 17 2016'), scope.monthlyMeans[0] * SIZE],
                [Date.parse('Feb 17 2016'), scope.monthlyMeans[1] * SIZE],
                [Date.parse('Mar 17 2016'), scope.monthlyMeans[2] * SIZE],
                [Date.parse('Apr 17 2016'), scope.monthlyMeans[3] * SIZE],
                [Date.parse('May 17 2016'), scope.monthlyMeans[4] * SIZE],
                [Date.parse('Jun 17 2016'), scope.monthlyMeans[5] * SIZE],
                [Date.parse('Jul 17 2016'), scope.monthlyMeans[6] * SIZE],
                [Date.parse('Aug 17 2016'), scope.monthlyMeans[7] * SIZE],
                [Date.parse('Sep 17 2016'), scope.monthlyMeans[8] * SIZE],
                [Date.parse('Oct 17 2016'), scope.monthlyMeans[9] * SIZE],
                [Date.parse('Nov 17 2016'), scope.monthlyMeans[10] * SIZE],
                [Date.parse('Dec 17 2016'), scope.monthlyMeans[11] * SIZE]
              ]
            }, {
              'key': 'Actuele maandsom',
              'color': '#16a085',
              'values': data
            }])
            .call(chartPrint);
          }
        );
      // }
    };

    nv.addGraph(function () {
      // TODO: when monthly rain amount is correct fix axis below.
      chart.showYAxis(false);
      chart.yAxis
      .tickFormat(function(){return ''}) // d3.format(',.1f'))
      .axisLabel('Regen'); // (mm)');

      chartPrint.showYAxis(false);
      chartPrint.yAxis
      .tickFormat(function(){return ''}) // d3.format(',.1f'))
      .axisLabel('Regen'); // (mm)');

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
      uuid: '='
    },
    template: require('./rain-graph.html')
  };
}];

module.exports = rainGraphWidget;
