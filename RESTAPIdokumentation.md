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
    10. [Update prosumer setting: blocked](#upd_pro_block)
    11. [Update prosumer setting: broken](#upd_pro_brok)
    12. [Update prosumer setting: blackout](#upd_pro_blak)
    13. [Delete prosumer setting](#del_pro_set)
    
2. [Prosumer Logs](#pro_log)
    1. [Add a prosumer log](#add_pro_log)
    2. [Get all logs from specific prosumer](#get_all_pro_log)
    3. [Get the latest log from specific prosumer](#get_lat_pro_log)
    4. [Delete all logs from a specific prosumer](#del_pro_log)
    
3. [Manager Settings](#man_set)
    1. [Get all manager settings](#man_set_all)
    2. [Add a new manager setting](#man_set_add_new)
    3. [Get a manager setting: market_price](#man_get_mprice)
    4. [Update a manager setting: market_price](#man_upd_mprice)
    5. [Update a manager setting: pp_status](#man_upd_pp)
    6. [Update a manager setting: production](#man_upd_prod)
    7. [Update a manager setting: inc_status](#man_upd_istat)
    8. [Update a manager setting: inc_prod](#man_upd_iprod)
    9. [Update manager setting: img_url](#man_set_upd_img)
    10. [Update manager setting: password](#man_set_upd_pw)
    11. [Update manager setting: online](#man_set_upd_onl)
    12. [Update manager setting: battery_warning_threshold](#man_set_upd_bat)
    13. [Delete manager setting](#man_set_del)
    
4. [Manager Logs](#man_log)
    1. [Add a manager log](#man_log_add)
    2. [Get all manager logs](#man_log_all)
    3. [Get latest manager log](#man_log_lat)
    4. [Delete all manager logs](#man_log_del)

5. [Wind Speed](#wind_speed)
    1. [Add wind speed log](#wind_speed_add)
    2. [Get wind speed log](#wind_speed_get)
    3. [Add many wind speed log](#wind_speed_addm)
    
6. [Blackout](#black)
    1. [Add blackout log](#black_add)
    2. [Get blackout log](#black_get)
    
7. [Authentication](#auth)
    1. [Register](#auth_reg)
    2. [Login](#auth_log)
    3. [Logout](#auth_logu)


### Prosumer Settings <a name="pro_settings"></a>

#### Get all prosumer settings <a name="all_pro_settings"></a>
**GET** to **/api/prosumersettings**

You will recieve a response on the form:
```json
  [{
    "_id": "5fege2",
    "id": "lisa",
    "img_url": formDataFileUpload,
    "distribution": {
      "_id": "4fe5ge5",
      "sell": 0.2,
      "store": 0.8,
      "buy": 0.5,
      "drain": 0.5
    },
    "blocked": 0,
    "broken": 0,
    "battery_warning_threshold": 40,
    "login_credentials": {
      "_id": "geg5ege",
      "password": "no you, mr hackerman!",
      "online": 1
    }
  }]
```


#### Get a prosumer setting <a name="a_pro_settings"></a>
**GET** to **/api/prosumersettings/*id***

Here, id is the id of the prosumerSetting you want to get.
You will recieve a response on the form:
```json
{
 "_id": "5fege2",
    "id": "lisa",
    "img_url": formDataFileUpload,
    "distribution": {
      "_id": "4fe5ge5",
      "sell": 0.2,
      "store": 0.8,
      "buy": 0.5,
      "drain": 0.5
    },
    "blocked": 0,
    "broken": 0,
    "battery_warning_threshold": 40,
    "login_credentials": {
      "_id": "geg5ege",
      "password": "no you, mr hackerman!",
      "online": 1
    }
}
```

#### Add a new prosumer setting <a name="new_pro_setting"></a>
**POST** to **/api/prosumersettings**


You need to input a body on the below format:
```json
{
    "id":"axel2",
    "img_url": formDataFileUpload,
    "distribution": {
        "sell": 0.2,
        "store": 0.8,
        "buy": 0.4,
        "drain": 0.6
    },
    "blocked": 0,
    "broken": 0,
    "blackout": false,
    "battery_warning_threshold": 50,
    "login_credentials": {
        "password": "secretboi",
        "online": 0
    }
}
```

#### Update prosumer setting: img_url <a name="upd_pro_img"></a>
**POST** to **/api/prosumersettings/*id*/img_url**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "img_url": formDataFileUpload
}
```

#### Update prosumer setting: password <a name="upd_pro_pw"></a>
**PUT** to **/api/prosumersettings/*id*/password**

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
**PUT** to **/api/prosumersettings/*id*/online**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "login_credentials":{
      "online": 2
    }
}
```

#### Update prosumer setting: distr_over <a name="upd_pro_dist_over"></a>
**PUT** to **/api/prosumersettings/*id*/distr_over**

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

#### Update prosumer setting: distr_under <a name="upd_pro_dist_under"></a>
**PUT** to **/api/prosumersettings/*id*/distr_under**

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

#### Update prosumer setting: battery_warning_threshold <a name="upd_pro_bat"></a>
**PUT** to **/api/prosumersettings/*id*/battery_warning_threshold**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "battery_warning_threshold": 50
}
```

#### Update prosumer setting: blocked <a name="upd_pro_block"></a>
**PUT** to **/api/prosumersettings/*id*/block**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "blocked": 0
}
```

#### Update prosumer setting: broken <a name="upd_pro_brok"></a>
**PUT** to **/api/prosumersettings/*id*/broken**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "broken": 0
}
```

#### Update prosumer setting: blackout <a name="upd_pro_blak"></a>
**PUT** to **/api/prosumersettings/*id*/blackout**

Here, id is the id of the prosumerSetting you want to update.
You need to input a body on the below format:
```json
{
    "blackout": 0
}
```

#### Delete prosumer setting <a name="del_pro_set"></a>
**DELETE** to **/api/prosumersettings/*id*/delete**

Here, id is the id of the prosumerSetting you want to update.
You can expect a response as:
```json
The prosumer settings are now deleted
```

### Prosumer Logs <a name="pro_log"></a>

#### Add a prosumer log <a name="add_pro_log"></a>
**POST** to **/api/prosumerlog**

You will need to send a body with the form below:
```json
{
    "id": "Haxel",
    "consumption": 40,
    "production": 30,
    "net_production": 5,
    "tick": 10,
    "battery_level": 110,
    "broken": false,
    "weather": {
        "wind_speed": 6,
        "temperature": 10
    }
}
```

#### Get all logs from specific prosumer <a name="get_all_pro_log"></a>
**GET** to **/api/prosumerlog/:id/getall**

Here the id is the id of the prosumer you want to get logs from.
You will get a response in the form of:
```json
[
    {
        "_id": "5fc7ba56440f1000bc58faad",
        "id": "Haxel",
        "consumption": 40,
        "production": 30,
        "net_production": 5,
        "tick": 10,
        "battery_level": 110,
        "broken": false,
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
**GET** to **/api/prosumerlog/:id/getlatest**

Here the id is the id of the prosumer you want to get the latest log from.
You will get a response in the form of:
```json
[
    {
        "_id": "5fc7ba56440f1000bc58faad",
        "id": "Haxel",
        "consumption": 45,
        "production": 30,
        "net_production": 5,
        "tick": 11,
        "battery_level": 110,
        "broken": false,
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
**DELETE** to **/api/prosumerlog/:id/delete**

Here the id is the id of the prosumer you want to delete logs from.
You will get a response in the form below:
```json
The prosumer logs are deleted
```


### Manager Settings <a name="man_set"></a>

#### Get all manager settings <a name="man_set_all"></a>
**GET** to **/api/managersettings/get**

You will recieve a response on the form:
```json
{   
    "_id": "5fc7b4acfaf96a00a3c0940d",
    "id": "Manager",
    "market_price": 7,
    "production": 600,
    "PP-status": 1,
    "inc_status_change": {
        "timer": 3,
        "new_status": 1,
    }
    "inc_prod_change": {
        "timer": 3,
        "new_prod": 400,
    }
    "img_url": formDataFileUpload,
    "battery_warning_threshold": 35,
    "distribution": {
        "store": 0,
        "sell": 1,
    }
    "login_credentials": {
        "_id": "5fc7b4acfaf96a00a3c0940d",
        "password": "secure123",
        "online": 0
    },
    "__v": 0
}
```

#### Add a new manager setting <a name="man_set_add_new"></a>
**POST** to **/api/managersettings**

The manager has a set id "Manager" since there will only be one.
You need to input a body on the below format:
```json
{
    "id": "Manager",
    "market_price": 7,
    "production": 600,
    "pp-status": 1,
    "inc_status_change": {
        "timer": 3,
        "new_status": 1,
    }
    "inc_prod_change": {
        "timer": 3,
        "new_prod": 400,
    }
    "img_url": formDataFileUpload,
    "battery_warning_threshold": 35,
    "distribution": {
        "store": 0,
        "sell": 1,
    }
    "login_credentials": {
        "password": "secure123",
        "online": 0
    }
}
```

#### Get manager setting: market_price <a name="man_get_mprice"></a>
**GET** to **/api/marketprice**

The id is already set for the manager.
You will recieve a response with the format below:
```json
{
    "market_price": 4,
}
```

#### Update manager setting: market_price <a name="man_upd_mprice"></a>
**PUT** to **/api/marketprice**

The id is already set for the manager.
You must send a request with the format below:
```json
{
    "market_price": 4,
}
```

#### Update manager setting: pp_status <a name="man_upd_pp"></a>
**PUT** to **/api/managersettings/pp_status**

The id is already set for the manager.
You must send a request with the format below:
```json
{
    "pp_status": 1,
}
```

#### Update manager setting: production <a name="man_upd_prod"></a>
**PUT** to **/api/managersettings/production**

The id is already set for the manager.
You must send a request with the format below:
```json
{
    "production": 800,
}
```

#### Update manager setting: inc_status_change <a name="man_upd_istat"></a>
**PUT** to **/api/managersettings/inc_status_change**

The id is already set for the manager.
You must send a request with the format below:
```json
{
    "inc_status_change": : {
        "timer": 3,
        "new_status": 1,
    }
}
```

#### Update manager setting: inc_prod_change <a name="man_upd_iprod"></a>
**PUT** to **/api/managersettings/inc_prod_change**

The id is already set for the manager.
You must send a request with the format below:
```json
{
    "inc_prod_change": : {
        "timer": 3,
        "new_prod": 700,
    }
}
```

#### Update manager setting: img_url <a name="man_set_upd_img"></a>
**POST** to **/api/managersettings/img_url**

The id is already set for the manager.
You only need to input a body with the format below:
```json
{
    "img_url": formDataFileUpload
}
```

#### Update manager setting: password <a name="man_set_upd_pw"></a>
**PUT** to **/api/managersettings/password**

You need to input a body with the format below:
```json
{
    "login_credentials": {
      "password": "secretboi"
    }
}
```

#### Update manager setting: online <a name="man_set_upd_onl"></a>
**PUT** to **/api/managersettings/online**

You need to input a body on the below format:
```json
{
    "login_credentials":{
      "online": 3
    }
}
```

#### Update manager setting: battery_warning_threshold <a name="man_set_upd_bat"></a>
**PUT** to **/api/managersettings/battery_warning_threshold**

You need to input a body on the below format:
```json
{
    "battery_warning_threshold": 200
}
```

#### Delete manager setting <a name="man_set_del"></a>
**DELETE** to **/api/managersettings/delete**

You can expect a response as:
```json
The manager settings are now deleted.
```

### Manager Logs <a name="man_log"></a>

#### Add a manager log <a name="man_log_add"></a>
**POST** to **/api/managerlog**

You will need to send a body with the form below:
```json
{
    "pp_status": 1,
    "market_demand": 2000,
    "recommended_market_price": 4,
    "market_price": 12,
    "battery_level": 2500,
    "production": 900,
    "tick": 14,
    "power_plant_consumption": 130,
    "nr_of_consumers": 8
}
```

#### Get all manager logs <a name="man_log_all"></a>
**GET** to **/api/managerlog/getall**

You will get a response with the form:
```json
[
    {
        "_id": "5fc7bdfd31ce3400cae2839c",
        "id": "Manager",
        "pp_status": 1,
        "market_demand": 2000,
        "recommended_market_price": 4,
        "market_price": 12,
        "battery_level": 2500,
        "production": 900,
        "tick": 14,
        "power_plant_consumption": 130,
        "nr_of_consumers": 8,
        "__v": 0
    }
]
```

#### Get latest manager log <a name="man_log_lat"></a>
**GET** to **/api/managerlog/getlatest**

You will get a response with the form:
```json
[
    {
        "_id": "5fc7bdfd31ce3400cae2839c",
        "id": "Manager",
        "pp_status": 1,
        "market_demand": 2000,
        "recommended_market_price": 4,
        "market_price": 12,
        "battery_level": 2550,
        "production": 600,
        "tick": 15,
        "power_plant_consumption": 130,
        "nr_of_consumers": 8,
        "__v": 0
    }
]
```

#### Delete all manager logs <a name="man_log_del"></a>
**DELETE** to **/api/managerlog/delete**

You will get a response as:
```json
The manager logs are now deleted
```

### Wind Speed <a name="wind_speed"></a>

#### Add wind speed log <a name="wind_speed_add"></a>
**POST** to **/api/windspeed**

You will need to send a body with the form below:
```json
{
    "tick": 0,
    "wind_speed": 5.3,
}
```

#### Get wind speed log <a name="wind_speed_get"></a>
**GET** to **/api/windspeed/:tick**

The :tick is the tick-requested log. 
You will receive a response with the form below:
```json
{
    "tick": 0,
    "wind_speed": 5.3,
}
```

#### Add many wind speed log <a name="wind_speed_addm"></a>
**POST** to **/api/windspeed/many**

You will need to send a body with the form below:
```json
{[{
    "tick": 0,
    "wind_speed": 5.3,
}]}
```

### Blackouts <a name="black"></a>

#### Add blackout log <a name="black_add"></a>
**POST** to **/api/blackouts**

Amount will logg for prosumer or consumers.
You will need to send a body with the form below:
```json
{
    "id": "userid",
    "tick": 74,
    "amount": 5,
    
}
```

#### Get blackout log <a name="black_get"></a>
**GET** to **/api/blackouts**

Amount is logg for prosumer or consumers.
You will receive a response with the form below:
```json
{
    "id": "userid",
    "tick": 74,
    "amount": 5,
    
}
```

### Authentication <a name="auth"></a>

#### Register a user <a name="auth_reg"></a>
**POST** to **/api/register**

You will need to send a body with the form below:
```json
{
    "id": "axel123",
    "password": "hejsan123"
}
    
}
```

#### Login a user <a name="auth_log"></a>
**POST** to **/api/login**

You will need to send a body with the form below:
```json
{
    "id": "axel123",
    "password": "hejsan123"
}
    
}
```

#### Logout a user <a name="auth_logu"></a>
**GET** to **/api/logout**

You will receive a response with the form below:
```json
{
    'Successfully logged out.'
}
    
}
```


