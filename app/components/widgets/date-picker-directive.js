var datePicker = function (StateService) {
  /**
  * datePickerLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @return {object}       - Object with angular config
  */
  var datePickerLink = function (scope, elem) {
    var updateScope = function () {
      scope.month = StateService.get('month');
      scope.year = StateService.get('year');
    };

    scope.months = [{title: 'sdf'}, {title: 'sadf'}];
    scope.years = [{title: 'sdf'}, {title: 'sadf'}];

    updateScope(StateService);

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
