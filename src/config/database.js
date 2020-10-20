module.exports = {
  uri:
    process.env.MONGO_DB_AUTH !== "false"
      ? `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}:/${process.env.MONGO_DB_NAME}`
      : `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}:/${process.env.MONGO_DB_NAME}`,
};
