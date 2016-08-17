var DEFAULTS = {
  reportType: 'neerslag',
  city: 'Utrecht',
  year: '2016',
  month: '08'
};

var StateService = function (UtilService) {
  var _state = {};

  _state.listeners = {};
  _state.listeners.change = {};

  _state.changed = function (callee, changedKey) {
    Object.keys(_state.listeners.change).forEach(function (key) {
      if (key !== callee) {
        _state.listeners.change[key](_state);
      }
    });
    if (_state.listeners['change:' + changedKey]) {
      Object.keys(_state.listeners['change:' + changedKey]).forEach(function (key) {
        if (key !== callee) {
          _state.listeners['change:' + changedKey][key](_state[changedKey]);
        }
      });
    }
  };

  _state.get = function (string) {
    return _state[string];
  };

  _state.set = function (string, item, callee) {
    if (!item || item === '') {
      item = DEFAULTS[string];
    }
    _state[string] = item;
    _state.changed(callee, string);
    return _state;
  };

  // event handler
  _state.on = function (event, cb, origin) {
    if (_state.listeners[event]) {
      _state.listeners[event][origin] = cb;
    } else {
      _state.listeners[event] = {};
      _state.listeners[event][origin] = cb;
    }
  };

  var updateDate = function () {
    var newDate = new Date();
    newDate.setMonth(parseInt(_state.get('month') - 1));
    newDate.setYear(parseInt(_state.get('year')));
    newDate.setDate(1);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(1);
    newDate.setMilliseconds(0);
    _state.set('date', newDate, 'StateService');
  };

  _state.on('change', updateDate, 'StateService');

  var updateBounds = function (city) {
    UtilService.getBounds(city).then(function (bounds) {
      _state.set('bounds', bounds, 'StateService');
    });
  };

  _state.on('change:city', function (city) {
    updateBounds(city);
  }, 'StateService');

  // init
  _state.changed();

  return _state;
};

module.exports = StateService;
