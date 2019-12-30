require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const validate = require("express-validation");
const Youch = require("youch");
const Sentry = require("@sentry/node");
const path = require("path");

const sentry = require("./config/sentry");
const database = require("./database");

class App {
  constructor() {
    this.server = express();
    this.connection = database();

    this.middleweares();
    this.routes();
    this.exception();
    this.sentry();
  }

  sentry() {
    Sentry.init({
      dsn: sentry.dsn
    });
  }

  middleweares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(logger("dev"));
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
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV !== "production") {
        const youch = new Youch(err, req);

        return res.status(500).send(await youch.toHTML());
      }

      return res
        .status(err.status || 500)
        .json({ error: "Internal Server Error" });
    });
  }
}

const app = new App();

module.exports = app;
