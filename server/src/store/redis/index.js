import { redis } from "../../db.js";

const store = async (req, res) => {
  try {
    const { method, key, value } = req;
    if (method === "hset" && key && value) {
      const setResult = await redis.hset(key, value);

      if (!setResult) {
        console.log('Failed to set data', setResult);
        return;
      }

      // Set the expiration time for the key in seconds (7 days)
      const expireResult = await redis.expire(key, 7 * 24 * 60 * 60);

      if (expireResult === 1) {
        console.log('Result: Success');
      } else {
        console.log('Failed to set the expiration time', setResult);
      }
    }

    if (method === "hgetall" && key) {
      const getResult = await redis.hgetall(key);

      if (!getResult) {
        console.log('Failed to get data', getResult);
        return getResult;
      }
      return getResult;

    }
    if (method === "exists" && key) {
      const exists = await redis.exists(key);
      return exists;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default store;
