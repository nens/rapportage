var ExtremeRainService =  function () {
  var defaultRainTMax = {
    location: '',
    td_window: '0 dagen',
    max: 0,
    start: 0,
    end: 0,
    t: '-',
    t_choice: -1
  };

  var maxRain = function (allRain) {
    var maxRainStat = defaultRainTMax;
    allRain.forEach(function(rainStats){
      rainStats.stats.forEach(function(item) {
        if(maxRainStat.t_choice <= item.t_choice) {
          maxRainStat = item;
          maxRainStat.location = rainStats.location.title
        }
      });
    });
    return maxRainStat;
  };

  return {
    defaultRainTMax: defaultRainTMax,
    maxRain: maxRain
  }
};

module.exports = ExtremeRainService;