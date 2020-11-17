const express = require('express')
const cors = require('cors')
var { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express()
app.use(cors())


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3000, () => {
    console.info('Listening on http://localhost:3000/graphql');
});