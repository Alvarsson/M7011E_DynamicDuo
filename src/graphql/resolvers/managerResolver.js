
let links = [{
    id: '1',
    body: 'A body. Not a dead body. Also not a living body. A body as in the substance of something.',
  }]

module.exports = {
  Query: {
    theManager() {
        return links
    },
  },

  Manager: {
    id(args) {
      console.log(args);
      return args[0].id;
    },
    body(args) {
        console.log(args);
      return args[0].body;
    },
  },
};
