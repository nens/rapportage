var StateService = function () {
  var _state = {};

  _state.listeners = {};
  _state.listeners.change = {};

  _state.changed = function (callee) {
    Object.keys(_state.listeners.change).forEach(function (key) {
      if (key !== callee) {
        _state.listeners.change[key](_state);
      }
    });
  };

  _state.get = function (string) {
    return _state[string];
  };

  _state.set = function (string, item, callee) {
    _state[string] = item;
    _state.changed(callee);
    return _state;
  };

  // event handler
  _state.on = function (event, cb, origin) {
    if (_state.listeners[event]) {
      _state.listeners[event][origin] = cb;
    } else {
      throw new Error('This event: ' + event + ' is not (yet) suppported');
    }
  };

  var updateDate = function () {
    var newDate = new Date();
    newDate.setMonth(parseInt(_state.get('month') - 1));
    newDate.setYear(parseInt(_state.get('year')));
    _state.set('date', newDate, 'StateService');
  };

  _state.on('change', updateDate, 'StateService');

  // init
  _state.changed();

  return _state;
};

module.exports = StateService;
