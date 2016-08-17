/**
 * UrlUtil - detects what elements are on the path and adjusts the state
 * accordingly, and vice versa.
 *
 * @param  {object} StateService -
 * @param  {object} $location   -
 * @return {void}
 */
var UrlUtil = function (StateService, $location) {
  /**
   * defines the parts of the url (there are 4 parts first is empty)
   */
  var _urlDefinition = [
    '',
    'reportType',
    'city',
    'year',
    'month'
  ];

  var path = $location.$$path.split('/');

  /*
   * update the StateService according to the state.
   */
  var updateStateWithUrl = function () {
    _urlDefinition.forEach(function (urldef, index) {
      StateService.set(urldef, path[index], 'UrlUtil');
    });
  };

  var updateUrlWithState = function () {
    var newPath = [];
    _urlDefinition.forEach(function (urldef) {
      newPath.push(StateService.get(urldef));
    });
    $location.$$path = newPath.join('/');
  };



  // register callback
  StateService.on('change', updateUrlWithState, 'UrlUtil');

  return {
    updateUrlWithState: updateUrlWithState,
    updateStateWithUrl: updateStateWithUrl
  };
};

module.exports = UrlUtil;
