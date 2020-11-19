let links = [
  {
    id: "1",
    body:
      "A body. Not a dead body. Also not a living body. A body as in the substance of something.",
  },
];

module.exports = {
  Query: {
    theManager() {
      return links;
    },
    get: (parent, {key}, {redis}) => {
        try {
          return redis.get(key)
        } catch (error) {
          return null
        }
      }
    },
  
  

  Mutation: {
    set: async (parent, {key, value}, {redis}) => {
      try {
        await redis.set(key, value)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  },

  Manager: {
    id(args) {
      console.log(args);
      return args[0].id;
    },
    body: async (parent, args, {redisClient,redis}, info) => {
        console.log(redisClient.get("yolo",redis.print));
      return redisClient.get("yolo",redis.print);
    },
  },
};
