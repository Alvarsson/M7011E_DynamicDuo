// Do we want to perform cheap computation a lot of times, 
// or less cheap computation with some memory cost very few times?? 


/* function normal_dist_day() {
    spareRandom = null;
    var value, u, v, s, mul;
    if(spareRandom !== null) {
          value = spareRandom;
          spareRandom = null;
      }	else {
      do {
        u = Math.random()*2-1;
              v = Math.random()*2-1;
  
              s = u*u+v*v;
      } while(s === 0 || s >= 1);
      mul = Math.sqrt(-2 * Math.log(s) / s);
          value = u * mul;
          spareRandom = v * mul;
    }
    console.log(value);
    return value;
  }
  normal_dist_day(); */
    
/*   function normal_dist_year(values) { // Produces array with values norm-distr.
    var dist_values = [];
    var wind_speed = 0;
    for (var j = 0; j < values; j++) {
      for (var i = 5; i> 0; i--) {
        wind_speed += Math.floor(Math.random()*20);
      }
      dist_values.push(wind_speed/10);
      wind_speed = 0;
    }
    return dist_values;
    //console.log(dist_values);
  } */

  //Probably the best since we want to skew the times we get extreme weather.
function randn_gd(min,max,skew) { // skew = 1 is no skew. skew > 1 is skew at right side, skew < 1 is skew left.
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
  
function day_average(days) { // create list with day average wind speed.
  var day_list = [];
  for(var i = 0; i < days; i++) {
      day_list.push(randn_gd(0,20,2));
  }
  console.log(day_list)
  return day_list;
}

function hour_variation(average) { //return array with every hour wind speed of a day.
    //calls for norm.dist value around the day average and sets each hours windspeed
    var wind_per_hour = [average];
    for (var i = 1; i < 24; i++) {
        var min = average - 3;
        var max = average + 3;
        wind_per_hour.push(randn_gd(min, max, 1));
    }
    return wind_per_hour;
}

  // return change speed hour to hour. The change is per 10 minutes.
function weather_change(current_hour, next_hour) {
  var change = next_hour/current_hour
  return change/6;
}