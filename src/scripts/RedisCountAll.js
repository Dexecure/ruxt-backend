const redis = require("redis");
const { RedisHost } = require("./env.js");
const redisClient = redis.createClient(6379, RedisHost);

redisClient.keys("*", function(err, keys) {
  if (err) return console.log(err);
  console.log(keys.length);
  // for (var i = 0, len = keys.length; i < len; i++) {
  //   console.log(keys[i]);
  // }
});
