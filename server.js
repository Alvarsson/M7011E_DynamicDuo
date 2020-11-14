const express = require('express')
const cors = require('cors')
var { graphqlHTTP } = require('express-graphql');
//const gql = require('graphql-tag')
const { buildSchema } = require('graphql')

const app = express()
app.use(cors())


var weatherData = [{
    temperature: 2,
    windspeed: 5.1,

}]

const schema = buildSchema(`
  type Query {
    weather: Weather
  }

  type Weather {
      temperature: Int
      windspeed: Float
  }

`);

var getWeather = function () {

    return weatherData[0];

}

const rootValue = {
    
    weather: getWeather
}




app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}));

const port = process.env.PORT || 4000
app.listen(port)
console.log(`Running a GraphQL API server at localhost:${port}/graphql`)