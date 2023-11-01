import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PASS,
  username: process.env.REDIS_USER,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => console.log("Redis Client Error: ", err));

client.on("cconnect", () => console.log("Connected to Redis"));

if (!client.isOpen) {
  client.connect();
}

export { client };
