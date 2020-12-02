## This document contains the documentation on how to use all of the REST API paths
The base path for these calls will be: **http://SERVER_IP:3001**

# Table Of Contents
1. [Prosumer Settings](#pro_settings)
    1. [Get all prosumer setting](#all_pro_settings)
    2. [Get a prosumer setting](#a_pro_settings)
    3. [Add a new prosumer setting](#new_pro_setting)
    4. [Update prosumer setting: img_url](#upd_pro_img)
    5. [Update prosumer setting: password](#upd_pro_pw)
    6. [Update prosumer setting: online](#upd_pro_online)
    7. [Update prosumer setting: distr_over](#upd_pro_dist_over)
    8. [Update prosumer setting: distr_under](#upd_pro_dist_under)
    9. [Update prosumer setting: battery_warning_threshold](#upd_pro_bat)
    10. [Delete prosumer setting](#del_pro_set)
    
2. [Prosumer Logs](#pro_log)
    1. [Add a prosumer log](#add_pro_log)
    2. [Get all logs from specific prosumer](#get_all_pro_log)
    3. [Get the latest log from specific prosumer](#get_lat_pro_log)
    4. [Delete all logs from a specific prosumer](#del_pro_log)
    
3. [Manager Settings](#man_set)
    1. [Get all manager settings](#man_set_all)
    2. [Add a new manager setting](#man_set_add_new)
    3. [Update manager setting: img_url](#man_set_upd_img)
    4. [Update manager setting: password](#man_set_upd_pw)
    5. [Update manager setting: online](#man_set_upd_onl)
    6. [Update manager setting: battery_warning_threshold](#man_set_upd_bat)
    7. [Delete manager setting](#man_set_del)
4. [Manager Logs](#man_log)
    1. [Add a manager log](#man_log_add)
    2. [Get all manager logs](#man_log_all)
    3. [Get latest manager log](#man_log_lat)
    4. [Delete all manager logs](#man_log_del)

### Prosumer Settings <a name="pro_settings"></a>

#### Get all prosumer setting <a name="all_pro_settings"></a>
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


#### Get a prosumer setting <a name="a_pro_settings"></a>
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

#### Add a new prosumer setting <a name="new_pro_setting"></a>
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

#### Update prosumer setting: img_url <a name="upd_pro_img"></a>
**PUT** to **/prosumersettings/*id*/img_url**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "img_url":"cageosv.png"
}
```

#### Update prosumer setting: password <a name="upd_pro_pw"></a>
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

#### Update prosumer setting: online <a name="upd_pro_online"></a>
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

#### Update prosumer setting: distr_over <a name="upd_pro_dist_over"></a>
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

#### Update prosumer setting: distr_under <a name="upd_pro_dist_under"></a>
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

#### Update prosumer setting: battery_warning_threshold <a name="upd_pro_bat"></a>
**PUT** to **/prosumersettings/*id*/battery_warning_threshold**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "battery_warning_threshold": "50"
}
```

#### Delete prosumer setting <a name="del_pro_set"></a>
**DELETE** to **/prosumersettings/*id*/delete**

Here, id is the id of the prosumerSetting you want to update.
You can expect a response as:
```json
The prosumer settings are now deleted
```

### Prosumer Logs <a name="pro_log"></a>

#### Add a prosumer log <a name="add_pro_log"></a>
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

#### Get all logs from specific prosumer <a name="get_all_pro_log"></a>
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

#### Get the latest log from specific prosumer <a name="get_lat_pro_log"></a>
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

#### Delete all logs from a specific prosumer <a name="del_pro_log"></a>
**DELETE** to **/prosumerlog/:id/delete**

Here the id is the id of the prosumer you want to delete logs from.
You will get a response in the form below:
```json
The prosumer logs are deleted
```


### Manager Settings <a name="man_set"></a>

#### Get all manager settings <a name="man_set_all"></a>
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

#### Add a new manager setting <a name="man_set_add_new"></a>
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

#### Update manager setting: img_url <a name="man_set_upd_img"></a>
**PUT** to **/managersettings/img_url**

The id is already set for the manager.
You only need to input a body with the format below:
```json
{
    "img_url": "www.nybild.img"
}
```

#### Update manager setting: password <a name="man_set_upd_pw"></a>
**PUT** to **/managersettings/password**

You need to input a body with the format below:
```json
{
    "login_credentials": {
      "password": "secretboi"
    }
}
```

#### Update manager setting: online <a name="man_set_upd_onl"></a>
**PUT** to **/managersettings/online**

You need to input a body on the below format:
```json
{
    "login_credentials":{
      "online": "3"
    }
}
```

#### Update manager setting: battery_warning_threshold <a name="man_set_upd_bat"></a>
**PUT** to **/managersettings/battery_warning_threshold**

You need to input a body on the below format:
```json
{
    "battery_warning_threshold": "200"
}
```

#### Delete manager setting <a name="man_set_del"></a>
**DELETE** to **/managersettings/delete**

You can expect a response as:
```json
The manager settings are now deleted.
```

### Manager Logs <a name="man_log"></a>

#### Add a manager log <a name="man_log_add"></a>
**POST** to **/managerlog**

You will need to send a body with the form below:
```json
{
    "market_price": "12",
    "battery_level": "2500",
    "production": "900",
    "tick": "14",
    "total_net_consumption": "1000",
    "power_plant_consumption": "130",
    "nr_of_consumers": "8"
}
```

#### Get all manager logs <a name="man_log_all"></a>
**GET** to **/managerlog/getall**

You will get a response with the form:
```json
[
    {
        "_id": "5fc7bdfd31ce3400cae2839c",
        "id": "Manager",
        "market_price": 12,
        "battery_level": 2500,
        "production": 900,
        "tick": 14,
        "total_net_consumption": 1000,
        "power_plant_consumption": 130,
        "nr_of_consumers": 8,
        "__v": 0
    }
]
```

#### Get latest manager log <a name="man_log_lat"></a>
**GET** to **/managerlog/getlatest**

You will get a response with the form:
```json
[
    {
        "_id": "5fc7bdfd31ce3400cae2839c",
        "id": "Manager",
        "market_price": 12,
        "battery_level": 2550,
        "production": 600,
        "tick": 15,
        "total_net_consumption": 1000,
        "power_plant_consumption": 130,
        "nr_of_consumers": 8,
        "__v": 0
    }
]
```

#### Delete all manager logs <a name="man_log_del"></a>
**DELETE** to **/managerlog/delete**

You will get a response as:
```json
The manager logs are now deleted





