const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// Each day need a randomized average value.
// for each day, should we go randmoize value hour by hour, or create normal distr. for each hour beforehand?
// How to transition between each day?
// The easies is to pre-emptively produce all the wind data and then just follow that shit with an incr/decr function each hour.


function normal_dist_day() {
  var value, u, v, s, mul;
  if(spareRandom !== null) {
		val = spareRandom;
		spareRandom = null;
	}	else {
    do {
      u = Math.random()*2-1;
			v = Math.random()*2-1;

			s = u*u+v*v;
    } while(s === 0 || s >= 1);
    mul = Math.sqrt(-2 * Math.log(s) / s);
		val = u * mul;
		spareRandom = v * mul;
  }
  return val
}

function normal_dist_year(values) { 
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
}

// Set rnd value from norm dist for each day of year.
// Use data array for these values?
function rnd_day_average() {
  var list = normal_dist(100);
  var value = Math.floor(Math.random()*100);
  
}

function rnd_hour() {

}
function weather_change() {

}