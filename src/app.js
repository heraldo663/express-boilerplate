require("dotenv").config();
const express = require("express");
// const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const Youch = require("youch");
const Sentry = require("@sentry/node");

const { ValidationError } = require("express-validation");
const expressWinston = require("express-winston");

const winstonConfig = require("./config/winston");
const sentry = require("./config/sentry");
const database = require("./database");

class App {
  constructor() {
    this.server = express();
    this.db = database();

    this.middleware();
    this.routes();
    this.exception();
    this.sentry();
  }

  sentry() {
    Sentry.init({
      dsn: sentry.dsn,
    });
  }

  middleware() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());

    this.server.use(expressWinston.logger(winstonConfig));
    this.server.use(helmet());
    this.server.use(cors());
  }

  routes() {
    this.server.use("/api/v1", require("./routes"));
  }

  exception() {
    if (process.env.NODE_ENV !== "production")
      this.server.use(Sentry.Handlers.errorHandler());

    this.server.use(async (err, req, res, next) => {
      if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
      }

      if (process.env.NODE_ENV !== "production") {
        const youch = new Youch(err, req);

        return res.status(500).send(err);
      }

      return res
        .status(err.status || 500)
        .json({ error: "Internal Server Error" });
    });
  }
}

const app = new App();

module.exports = app;
