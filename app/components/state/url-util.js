/**
 * UrlUtil - detects what elements are on the path and adjusts the state
 * accordingly, and vice versa.
 *
 * @param  {object} $location   -
 * @return {void}
 */
var UrlUtil = function ($location) {
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

  /*
   * update the StateService according to the state.
   */
  var updateStateWithUrl = function () {
    var path = $location.$$path.split('/');
    var newState = {};
    _urlDefinition.forEach(function (urldef, index) {
      if (path[index]) {
        newState[urldef] = path[index];
      }
    });

    return newState;
  };

  var updateUrlWithState = function (state) {
    var newPath = [];
    _urlDefinition.forEach(function (urldef) {
      newPath.push(state[urldef]);
    });
    $location.path(newPath.join('/'));
  };

  return {
    updateUrlWithState: updateUrlWithState,
    updateStateWithUrl: updateStateWithUrl
  };
};

module.exports = UrlUtil;
