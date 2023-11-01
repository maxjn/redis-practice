const { createClient } = require("redis");

const client = createClient({
  password: process.env.REDIS_PASS,
  username: process.env.REDIS_USER,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => console.log("Redis Connection Error: ", err));

client.on("connect", () => console.log("Redis Connected"));

if (!client.isOpen) {
  client.connect();
}

module.exports = { client };
