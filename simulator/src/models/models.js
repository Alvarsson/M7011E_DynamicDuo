module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    title: String,
  });

  const Tutorial = mongoose.model("test", schema);
  return Tutorial;
};
