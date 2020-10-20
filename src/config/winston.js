const winston = require("winston");

const consoleLogger =
  process.env.NODE_ENV === "development" && new winston.transports.Console();

const transports = [
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    level: "info",
    handleExceptions: true,
    json: true,
    maxsize: 10485760, // 10MB
    maxFiles: 5,
    colorize: false,
    filename: "logs/combined.log",
  }),
];

if (consoleLogger) {
  transports.push(consoleLogger);
}

module.exports = {
  transports: transports,
  format: winston.format.combine(winston.format.json()),
};
