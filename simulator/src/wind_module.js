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
      //console.log(num);
      return num;
  }
    
  day_average(days) { // create list with day average wind speed.
    var day_list = [];
    for(var i = 0; i < days; i++) {
        day_list.push(randn_gd(0,20,2));
    }
    console.log(day_list)
    return day_list;
  }

  hour_variation(average) { //return array with every hour wind speed of a day.
      //calls for norm.dist value around the day average and sets each hours windspeed
      var wind_per_hour = [average];
      for (var i = 1; i < 24; i++) {
          var min = average - 3;
          var max = average + 3;
          wind_per_hour.push(randn_gd(min, max, 1));
      }
      return wind_per_hour;
  }

  get_GD_for_time(sim_time) {
      var day_ave_list = day_average(sim_time);
      var all_wind_data = new Array();
      for (i= 0; i < day_ave_list.length; i++) {
          var day_wind = hour_variation(i);
          all_wind_data.push(day_wind);
      }
      return all_wind_data;
  }

    // return change speed hour to hour. The change is per 10 minutes.
  weather_change(current_hour, next_hour) {
      var change = next_hour/current_hour
      return change/6;
  }
}
module.exports = WindModule;