### Collection: ProsumerSettings
```json
{
    "id": "prosumer1",
    "imgUrl": formDataFileUpload,
    "distribution": {
        "sell": 0.2,
        "store": 0.8,
        "buy": 0.3,
        "drain": 0.7
    },
    "batteryWarningThreshold": 200,
    "blocked": 0,
    "broken": 0,
    "blackout": false,
    "loginCredentials": {
        "password": "hashedPW",
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
    "net_production": 5,
    "tick": 45,
    "battery_level": 200,
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
    "market_price": 5,
    "production": 800,
    "pp_status": 1,
    "inc_status_change": {
        "timer": 3,
        "new_status": 1
    },
    "inc_prod_change": {
        "timer": 3,
        "new_prod": 900 
    },
    "imgUrl": formDataFileUpload,
    "batteryWarningThreshold": 200,
    "distribution": {
        "sell": 0.6,
        "store": 0,4
    },
    "loginCredentials": {
        "password": "hashatPassword",
        "online": 1
    }
}
```

### Collection: ManagerLogs
```json
{
    "id": "manager1",
    "pp_status": 1,
    "recommended_market_price": 6.3,
    "market_demand": 2600,
    "market_price": 13,
    "battery_level": 3000,
    "production": 800,
    "tick": 46,
    "PowerPlantConsumption": 150,
    "nrOfConsumers": 10
}
```

### Collection: WindSpeed Schema
```json
{
    "tick": 15,
    "windSpeed: 13.2
}
```


### Collection: Blackouts (Prosumer case)
```json
{
    "id": "prosumer1",
    "tick": 45,
    "amount": 1
}
```


### Collection: Blackouts (Consumer case)
```json
{
    "id": "consumer",
    "tick": 45,
    "amount": 7
}
```

### Collection: User Schema
```json 
{
    "id": "prosumer123",
    "password": "superSecretPW666",
    "token": JWT
}




