

var StateService = function (UtilService) {
  var _state = {};

  _state.updateDate = function (state) {
    var newDate = new Date(Date.parse(state.month + ' 01 ' + ' ' + state.year));
    return newDate;
  };


  _state.updateBounds = function (city) {
    return UtilService.getBounds(city).then(function (bounds) {
      return bounds;
    });
  };

  return _state;
};

module.exports = StateService;
