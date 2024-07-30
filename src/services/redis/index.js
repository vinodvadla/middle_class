const { createClient } = require("redis");

const client = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-17701.c244.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 17701,
  },
});

module.exports = { client };
