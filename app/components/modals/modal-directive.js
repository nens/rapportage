var modalWidget = ['$document', function($document) {
  /**
  * modalLink - this makes the branded header work. The link
  * function is called on initiating the dom elem.
  *
  * @param  {object} scope - local watchable scope of directive
  * @param  {object} elem  - dom element.
  * @param  {object} attrs - contents of the attributes
  * @return {object}       - Object with angular config
  */

  var modalLink = function (scope, elem) {
    scope.info = scope.marketing = false;
    if (!scope.active){
      scope.marketing = true;
      var backDrop = angular.element('<div class="modal-backdrop in"></div>');
      var body = $document.find('body').eq(0)
              .addClass("modal-open")
              .append(backDrop);
      var modalElem = angular.element(elem[0])
          .addClass("in")
          .css({display: "block"});
    } else {
      scope.info = true;
    }
  };

  return {
    link: modalLink,
    replace: true,
    restrict: 'E',
    scope: {
      active: '='
    },
    template: require('./modal.html')
  };
}];

module.exports = modalWidget;
