var StateService = ['UtilService', function (UtilService) {
  var _state = {};

  _state.updateDate = function (state) {
    var newDate = new Date(Date.parse(state.year + '-' + state.month + '-01'));
    return newDate;
  };

  _state.updateBounds = function (geom) {
    return UtilService.getBounds(geom);
  };

  return _state;
}];

module.exports = StateService;
