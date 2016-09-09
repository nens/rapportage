var StateService = ['UtilService', function (UtilService) {
  var _state = {};

  _state.updateDate = function (state) {
    var newDate = new Date(Date.parse(state.month + ' 01 ' + ' ' + state.year));
    return newDate;
  };

  _state.updateBounds = function (geom) {
    return UtilService.getBounds(geom);
  };

  return _state;
}];

module.exports = StateService;
