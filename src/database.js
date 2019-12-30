const mongoose = require("mongoose");
const databaseConfig = require("./config/database");

module.exports = async function() {
  if (process.env.NODE_ENV === "test") {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const mongod = new MongoMemoryServer();
    databaseConfig.uri = await mongod.getConnectionString();
  }
  return mongoose.connect(databaseConfig.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};
