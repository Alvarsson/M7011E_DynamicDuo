const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const fs = require('fs');

const { print } = require('graphql');

const typesArray = loadFilesSync(path.join(__dirname, './types'), { extensions: ['graphql'] });

const typeDefs = mergeTypeDefs(typesArray);


const printedTypeDefs = print(typeDefs);
fs.writeFileSync('joined.graphqls', printedTypeDefs);
console.log("updated schema");

module.exports = typeDefs;