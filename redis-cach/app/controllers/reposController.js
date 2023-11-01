const { client } = require("../../utils/db");
const axios = require("axios");

const getReposNumber = async (req, res, next) => {
  try {
    const { username } = req.params;
    // Getting Data From Github
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    )

    const reposNumber = response.data.public_repos;

    // Setting in Redis Cach
    try {
      
      await client.set(username, reposNumber, { EX: 3600 });
      // Rest of your code
    } catch (error) {
      console.error("Redis SETEX error:", error);
    }

    console.log("Fetching...");
    res.send(
      `<h1><span style="color:red;">${username}</span> Has <span style="color:red;">${reposNumber}</span> Public Repositories. </h1>`
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Problem Getting Repos" });
  }
};

module.exports = { getReposNumber };
