//const { link } = require("fs")

module.exports = (mongoose) => {
    var prosumerSettingSchema = mongoose.Schema({
        id: Number,
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
        id: Number,
        consumption: Number,
        production: Number,
        tick: Number,
        batteryLevel: Number,
        broken: Boolean,
        weather: {
            windSpeed: {type: Number, required: true},
            temperature: Number
        }
    })
}