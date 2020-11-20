
module.exports = (mongoose) => {
    var windspeedSchema = mongoose.Schema({
      tick: Number,
      data: Number,
    });
  
    const weatherSpeeds = mongoose.model("weatherSpeeds", windspeedSchema);
    return weatherSpeeds;
  };
  