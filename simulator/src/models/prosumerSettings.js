//const { link } = require("fs")

module.exports = (mongoose) => {
    var prosumerSettingSchema = mongoose.Schema({
        id: String,
        imgUrl: String,
        distribution: {
            sell: {type: Number, required: true},
            store: {type: Number, required: true},
            buy: {type: Number, required: true},
            drain: {type: Number, required: true}
        },
        batteryWarningThreshold: Number,
        loginCredentials: {
            password: {type: String, required: true},
            online: Number
        }

    });
    const prosumerSetting = mongoose.model("prosumerSetting", prosumerSettingSchema);
    return prosumerSetting;
}

module.exports = (mongoose) => {
    var prosumerLogSchema = mongoose.Schema({
        id: String,
        consumption: Number,
        production: Number,
        tick: Number,
        batteryLevel: Number,
        broken: Boolean,
        weather: {
            windSpeed: {type: Number, required: true},
            temperature: Number
        }
    });
    const prosumerLog = mongoose.model("prosumerLog", prosumerLogSchema);
    return prosumerLog;
}
/* 
type Prosumer {
    id: ID!
    imgUrl: String
    distribution: Distribution
    batteryWarningThreshold: Float
    loginCredentials: LoginCredentials
    consumption: Float
    production: Float
    tick: Int
    batteryLevel: Float
    broken: Booelan
    weather: ProsumerWeather
}
type LoginCredentials {
    password: String
    online: Int
}
type Distribution {
    sell: Float
    store: Float
    buy: Float
    drain: Float
}
type ProsumerWeather {
    windspeed: Float
    temperature: Float
} */