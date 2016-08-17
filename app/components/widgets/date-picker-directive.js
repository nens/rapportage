var datePicker = function (StateService) {
  /**
  * datePickerLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @return {object}       - Object with angular config
  */
  var datePickerLink = function (scope) {
    scope.months = [
      'januari',
      'februari',
      'maart',
      'april',
      'mei',
      'juni',
      'juli',
      'augustus',
      'september',
      'oktober',
      'november',
      'december'
    ];
    scope.years = [];

    var updateScope = function () {
      scope.month = StateService.get('month');
      scope.year = StateService.get('year');

      scope.activeYear = scope.years[scope.indexOf(scope.year)];
      scope.activeMonth =  scope.months[scope.indexOf(parseInt(scope.month) - 1)];
    };

    var populateYears = function () {
      var year = new Date().getFullYear();
      for (var i = 0; i < 30; i++) {
        scope.years.push(year - i);
      }
    };

    scope.setMonth = function () {
      var newMonth = (scope.months.indexOf(scope.activeMonth) + 1).toString();
      if (parseInt(newMonth) < 10) {
        newMonth = '0' + newMonth;
      }
      StateService.set('month', newMonth, 'datePicker');
    };

    scope.setYear = function () {
      StateService.set('year', scope.activeYear, 'datePicker');
    };

    populateYears();
    updateScope();
    StateService.on('change', updateScope, 'datePicker');
  };

  return {
    link: datePickerLink,
    replace: true,
    restrict: 'E',
    scope: {},
    template: require('./date-picker.html')
  };
};

module.exports = datePicker;
