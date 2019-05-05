const kue = require("kue");
const Sentry = require("@sentry/node");
const jobs = require("../jobs");
const config = require("../../config");

const Queue = kue.createQueue({
  redis: config.redis
});

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle);

Queue.on("error", Sentry.captureException);

module.exports = Queue;
