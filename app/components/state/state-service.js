var StateService = function (UtilService) {
  var _state = {};

  _state.updateDate = function (state) {
    var newDate = new Date(Date.parse(state.month + ' 01 ' + ' ' + state.year));
    return newDate;
  };

  _state.updateBounds = function (city) {
    return UtilService.getBounds(city);
  };

  return _state;
};

module.exports = StateService;
