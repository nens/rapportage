var Chart = require('chart.js');

var rainGraphWidget = function (StateService) {
  /**
  * rainGraphWidgetLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @param  {object} attrs - contents of the attributes
  * @return {object}       - Object with angular config
  */
  var rainGraphWidgetLink = function (scope, elem, attrs) {
    var chart = new Chart(elem[0], {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    var updateScope = function () {
      scope.date = StateService.get('date');
      chart.update();
    };

    updateScope(StateService);

    StateService.on('change', updateScope, 'rainGraphWidget' + scope.$id);
  };

  return {
    link: rainGraphWidgetLink,
    replace: true,
    restrict: 'E',
    scope: {
      layers: '='
    },
    template: require('./rain-graph.html')
  };
};

module.exports = rainGraphWidget;
