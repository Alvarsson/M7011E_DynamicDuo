weatherData = { temp: 2, windspeed: 4 };

prosumers = [
  { id: 1, body: "WAt" },
  { id: 2, body: "aaaa" },
];

module.exports = {
  Query: {
    weatherData() {
      return weatherData;
    },
    prosumer: (_, args) => prosumers[parseInt(args.id) - 1],
  },
  Weather: {
    temp: (parent) => parent.temp,
    windspeed: (parent) => parent.windspeed,
  },
  Prosumer: {
    id: (parent) => parent.id,
    body: (parent) => parent.body,
  },
};
