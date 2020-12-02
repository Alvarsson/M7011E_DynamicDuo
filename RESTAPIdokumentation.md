## This document contains the documentation on how to use all of the REST API paths
The base path for these calls will be: **http://SERVER_IP:3001**


### Prosumer Settings

#### Get all prosumer setting
**GET** to **/prosumersettings**

You will recieve a response on the form:
```json
  [{
    "img_url": "cool.png",
    "_id": "5fege2",
    "id": "lisa",
    "distribution": {
      "_id": "4fe5ge5",
      "sell": 0.2,
      "store": 0.8,
      "buy": 0.5,
      "drain": 0.5
    },
    "battery_warning_threshold": 40,
    "login_credentials": {
      "_id": "geg5ege",
      "password": "no you, mr hackerman!",
      "online": 1
    }
  }]
```


#### Get a prosumer setting
**GET** to **/prosumersettings/*id***

Here, id is the id of the prosumerSetting you want to get.
You will recieve a response on the form:
```json
{
  "img_url": "cool.png",
  "_id": "5fege2",
  "id": "lisa",
  "distribution": {
    "_id": "4fe5ge5",
    "sell": 0.2,
    "store": 0.8,
    "buy": 0.5,
    "drain": 0.5
  },
  "battery_warning_threshold": 40,
  "login_credentials": {
    "_id": "geg5ege",
    "password": "no you, mr hackerman!",
    "online": 1
  }
}
```

#### Add a new prosumer setting
**POST** to **/prosumersettings**


You need to input a body on the below format:
```json
{
    "id":"lisa2",
    "img_url":"cageosv.png",
    "distribution": {
        "sell": 0.2,
        "store": 0.8,
        "buy": 0.4,
        "drain": 0.6
    },
    "battery_warning_threshold": 50,
    "login_credentials": {
        "password": "secretboi",
        "online": 0
    }
}
```

#### Update prosumer setting: img_url
**PUT** to **/prosumersettings/*id*/img_url**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "img_url":"cageosv.png"
}
```

#### Update prosumer setting: password
**PUT** to **/prosumersettings/*id*/password**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "login_credentials":{
      "password": "secretboi"
    }
}
```

#### Update prosumer setting: online
**PUT** to **/prosumersettings/*id*/online**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "login_credentials":{
      "online": "2"
    }
}
```

#### Update prosumer setting: distr_over
**PUT** to **/prosumersettings/*id*/distr_over**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "distribution":{
      "sell": "0.2",
      "store": "0.8"
    }
}
```

#### Update prosumer setting: distr_under
**PUT** to **/prosumersettings/*id*/distr_under**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "distribution":{
      "buy": "0.2",
      "drain": "0.8"
    }
}
```

#### Update prosumer setting: battery_warning_threshold
**PUT** to **/prosumersettings/*id*/battery_warning_threshold**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "battery_warning_threshold": "50"
}
```

#### Delete prosumer setting
**DELETE** to **/prosumersettings/*id*/delete**

Here, id is the id of the prosumerSetting you want to update.
You can expect a response as:
```json
The prosumer settings are now deleted
```

### Prosumer Logs

#### Add a prosumer log
**POST** to **/prosumerlog**

You will need to send a body with the form below:
```json
{
    "id": "Haxel",
    "consumption": "40",
    "production": "30",
    "tick": "10",
    "battery_level": "110",
    "broken_turbine": "false",
    "weather": {
        "wind_speed": "6",
        "temperature": "10"
    }
}
```

#### Get all logs from specific prosumer
**GET** to **/prosumerlog/:id/getall**

Here the id is the id of the prosumer you want to get logs from.
You will get a response in the form of:
```json
[
    {
        "_id": "5fc7ba56440f1000bc58faad",
        "id": "Haxel",
        "consumption": 40,
        "production": 30,
        "tick": 10,
        "battery_level": 110,
        "broken_turbine": false,
        "weather": {
            "_id": "5fc7ba56440f1000bc58faae",
            "wind_speed": 6,
            "temperature": 10
        },
        "__v": 0
    }
]
```

#### Get the latest log from specific prosumer
**GET** to **/prosumerlog/:id/getlatest**

Here the id is the id of the prosumer you want to get the latest log from.
You will get a response in the form of:
```json
[
    {
        "_id": "5fc7ba56440f1000bc58faad",
        "id": "Haxel",
        "consumption": 45,
        "production": 30,
        "tick": 11,
        "battery_level": 110,
        "broken_turbine": false,
        "weather": {
            "_id": "5fc7ba56440f1000bc58faae",
            "wind_speed": 6,
            "temperature": 11
        },
        "__v": 0
    }
]
```

#### Delete all logs from a specific prosumer
**DELETE** to **/prosumerlog/:id/delete**

Here the id is the id of the prosumer you want to delete logs from.
You will get a response in the form below:
```json
The prosumer logs are deleted
```


### Manager Settings

#### Get all manager settings
**GET** to **/managersettings/get**

You will recieve a response on the form:
```json
{
    "img_url": "mannen.img",
    "_id": "5fc7b4acfaf96a00a3c0940d",
    "id": "Manager",
    "battery_warning_threshold": 35,
    "login_credentials": {
        "_id": "5fc7b4acfaf96a00a3c0940e",
        "password": "PaSSwoRd ProTEctIOr 90o0",
        "online": 2
    },
    "__v": 0
}
```

#### Add a new manager setting
**POST** to **/managersettings**

The manager has a set id "Manager" since there will only be one.
You need to input a body on the below format:
```json
{
    "img_url": "www.mannen.img",
    "battery_warning_threshold": "35",
    "login_credentials": {
        "password": "secure123",
        "online": "0"
    }
}
```

#### Update manager setting: img_url
**PUT** to **/managersettings/img_url**

The id is already set for the manager.
You only need to input a body with the format below:
```json
{
    "img_url": "www.nybild.img"
}
```

#### Update manager setting: password
**PUT** to **/managersettings/password**

You need to input a body with the format below:
```json
{
    "login_credentials": {
      "password": "secretboi"
    }
}
```

#### Update manager setting: online
**PUT** to **/managersettings/online**

You need to input a body on the below format:
```json
{
    "login_credentials":{
      "online": "3"
    }
}
```

#### Update manager setting: battery_warning_threshold
**PUT** to **/managersettings/battery_warning_threshold**

You need to input a body on the below format:
```json
{
    "battery_warning_threshold": "200"
}
```

#### Delete manager setting
**DELETE** to **/managersettings/delete**

You can expect a response as:
```json
The manager settings are now deleted.
```

