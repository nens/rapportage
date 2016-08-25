
var brandedHeader = function () {
  /**
  * brandedHeaderLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @return {object}       - Object with angular config
  */
  var brandedHeaderLink = function (scope, element, attrs) {
    scope.city = 'Apeldoorn'
  };

  return {
    link: brandedHeaderLink,
    replace: true,
    restrict: 'E',
    scope: {
      reportType: '=',
      date: '='
    },
    template: require('./branded-header.html')
  };
};

module.exports = brandedHeader;
