
var brandedHeader = function (StateService) {
  /**
  * brandedHeaderLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @return {object}       - Object with angular config
  */
  var brandedHeaderLink = function (scope) {
    var updateScope = function () {
      console.log('aj hoor', StateService.get('date'), StateService)
      scope.city = StateService.get('city');
      scope.reportType = StateService.get('reportType');
      scope.date = StateService.get('date');
    };

    updateScope();

    StateService.on('change', updateScope, 'brandedHeader');
  };

  return {
    link: brandedHeaderLink,
    replace: true,
    restrict: 'E',
    template: require('./branded-header.html')
  };
};

module.exports = brandedHeader;
