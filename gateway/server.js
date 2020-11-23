const express = require("express");
const cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

//const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";
const Redis = require("ioredis");
const redis = new Redis(6379,'redis');


const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers.js");

const app = express();
app.use(cors());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      redis,
    },
  })
);


app.listen(8080, () => {
  console.info("Listening on http://localhost:8080/graphql");
});
