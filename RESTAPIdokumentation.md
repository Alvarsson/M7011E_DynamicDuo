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
      "online": 2
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
      "sell": 0.2,
      "store": 0.8
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
      "buy": 0.2,
      "drain": 0.8
    }
}
```

#### Update prosumer setting: battery_warning_threshold
**PUT** to **/prosumersettings/*id*/battery_warning_threshold**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "battery_warning_threshold": 50
}
```

