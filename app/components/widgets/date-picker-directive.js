var datePicker = function () {
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
    var populateYears = function () {
      var year = new Date().getFullYear();
      for (var i = 0; i < 30; i++) {
        scope.years.push(year - i);
      }
    };
    populateYears();

    var updateScope = function () {
      scope.activeYear = scope.years[scope.years.indexOf(parseInt(scope.year))];
      scope.activeMonth = scope.months[(parseInt(scope.month) - 1)];
    };

    scope.setMonth = function () {
      var newMonth = (scope.months.indexOf(scope.activeMonth) + 1).toString();
      if (parseInt(newMonth) < 10) {
        newMonth = '0' + newMonth;
      }
      scope.month = newMonth;
    };

    scope.setYear = function () {
      scope.year = scope.activeYear;
    };

    updateScope();

    scope.$watch('month', updateScope);
    scope.$watch('year', updateScope);
  };

  return {
    link: datePickerLink,
    replace: true,
    restrict: 'E',
    scope: {
      'month': '=month',
      'year': '=year'
    },
    template: require('./date-picker.html')
  };
};

module.exports = datePicker;
