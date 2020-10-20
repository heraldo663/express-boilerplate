const Bull = require("bull");
const Sentry = require("@sentry/node");
const jobs = require("../jobs");
const redisConfig = require("../../config/redis");

// const someQue = new Bull("queueName", {
//   redis: { port: redisConfig.port, host: redisConfig.host },
// });

// someQue.on("error", Sentry.captureException);

// module.exports = Queue;
