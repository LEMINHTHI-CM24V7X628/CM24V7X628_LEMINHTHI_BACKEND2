const { MongoClient } = require("mongodb");
const config = require("../config");

let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(config.db.uri);
    await client.connect();
    console.log("✅ Kết nối MongoDB thành công!");
  }
  return client;
}

module.exports = { connectDB };
