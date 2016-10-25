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
    var body = $document.find('body').eq(0);
    var modalElem = angular.element(elem[0]);
    var toggleModal = function(){
      if (!scope.active && !scope.loading){
        scope.info = false;
        scope.marketing = true;
        var backDrop = angular.element(
            '<div id="modal-backdrop" class="modal-backdrop in"></div>');
        body.addClass("modal-open").append(backDrop);
        modalElem.addClass("in").css({display: "block"});
      } else {
        scope.info = true;
        scope.marketing = false;
      }
    };
    scope.$watch('loading', toggleModal);
  };

  return {
    link: modalLink,
    replace: true,
    restrict: 'E',
    scope: {
      active: '=',
      loading: '='
    },
    template: require('./modal.html')
  };
}];

module.exports = modalWidget;
