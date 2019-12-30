module.exports = {
  uri: process.env.MONGO_URI || `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}:/${process.env.DB_NAME}`
};
