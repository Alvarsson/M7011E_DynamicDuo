### Collection: ProsumerSettings
```json
{
    "id": "prosumer1",
    "imgUrl": "ipaddr.se/img-url/wow/such/img",
    "distribution": {
        "sell": 0.2,
        "store": 0.8,
        "buy": 0.3,
        "drain": 0.7
    },
    "batteryWarningThreshold": 200,
    "loginCredentials": {
        "password": "hashatPassword",
        "online": 1
    }
}
```


### Collection: ProsumerLog
```json
{
    "id": "prosumer1",
    "consumption": 50,
    "production": 30,
    "tick": 45,
    "batteryLevel": 200,
    "broken": false,
    "weather": {
        "windSpeed": 3,
        "temperature": 22
    }
}
```

### Collection: ManagerSettings
```json
{
    "id": "manager1",
    "imgUrl": "ipaddr.se/img-url/wow/such/img",
    "batteryWarningThreshold": 200,
    "loginCredentials": {
        "password": "hashatPassword",
        "online": 1
    }
}
```

### Collection: Manager
```json
{
    "id": "manager1",
    "marketprice": 13,
    "batteryLevel": 3000,
    "production": 800,
    "totalNetConsumption": 900,
    "PowerPlantConsumption": 150,
    "nrOfConsumers": 10
}
```

### Collection: PreCalcWindSpeed
```json
{
    "tick": 15.2,
    "windSpeed: 13
}
```


### Collection: Blackouts (I fallet av prosumer)
```json
{
    "id": "prosumer1",
    "tick": 45,
    "amount": 1
}
```


### Collection: Blackouts (I fallet av consumers)
```json
{
    "id": "consumer",
    "tick": 45,
    "amount": 7
}
```
