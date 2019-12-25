require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const validate = require("express-validation");
const Youch = require("youch");
const Sentry = require("@sentry/node");

const database = require("./config/database");
const sentry = require("./config/sentry");

class App {
  constructor() {
    this.express = express();

    this.database();
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
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(express.json());
    this.express.use(logger("dev"));
    this.express.use(helmet());
    this.express.use(cors());
  }

  async database() {
    if (process.env.NODE_ENV === "test") {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = new MongoMemoryServer();
      database.uri = await mongod.getConnectionString();
    }
    mongoose.connect(database.uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  }

  routes() {
    this.express.use(require("./routes"));
  }

  exception() {
    if (process.env.NODE_ENV !== "production")
      this.express.use(Sentry.Handlers.errorHandler());

    this.express.use(async (err, req, res, next) => {
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

module.exports = new App().express;
