
var brandedHeader = function () {
  /**
  * brandedHeaderLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @return {object}       - Object with angular config
  */
  var brandedHeaderLink = function () {
    //
  };

  return {
    link: brandedHeaderLink,
    replace: true,
    restrict: 'E',
    scope: {
      city: '=',
      reportType: '=',
      date: '='
    },
    template: require('./branded-header.html')
  };
};

module.exports = brandedHeader;
