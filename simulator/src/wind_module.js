class WindModule {
    //Probably the best since we want to skew the times we get extreme weather.
  randn_gd(min,max,skew) { // skew = 1 is no skew. skew > 1 is skew at right side, skew < 1 is skew left.
      let u = 0, v = 0;
      while(u === 0) u = Math.random(); // convert [0,1] to (0,1)
      while(v === 0) v = Math.random();
      let num = Math.sqrt( -2.0 * Math.log(u)) * Math.cos( 2.0 * Math.PI * v);

      num = num/ 10.0 + 0.5; // Translate 0->1
      if (num > 1 || num < 0) num = randn_gd(min, max, skew); //resample
      num = Math.pow(num,skew); // skew it
      num *= max - min; // stretch
      num += min; // offset
      return num;
  }

  get_variation(prev_wind) {
      var min = prev_wind - 1;
      var max = prev_wind + 1;
      var next_val = this.randn_gd(min, max, 1);
      return next_val;
  }
  tick_variation(days) {
    var wind_per_tick = [];
    var days_to_ticks = (((days * 24) * 60) * 6); // 10 sec tick
    if (wind_per_tick.length == 0) {
        wind_per_tick.push(this.get_variation(4));
    }
    for (var i = 1; i < days_to_ticks; i++) {
        wind_per_tick.push(Math.round( this.get_variation(wind_per_tick[i-1]) * 1e2) / 1e2);
    }
    return wind_per_tick;
  }
  
}

module.exports = WindModule;