const express = require("express");
const { validate } = require('express-validation')
const handle = require("express-async-handler");

const authMiddelware = require("./app/middlewares/auth");

const UserController = require("./app/controller/UserController");
const SessionController = require("./app/controller/SessionController");

const UserValidator = require("./app/validators/User");
const SessionValidator = require("./app/validators/Session");

const routes = express.Router();

/**
 * Root route
 */
routes.get("/", (req, res) => {
  res.send("Server online").status("200");
});
/**
 * Register, Login Routes
 */
routes.post("/users", validate(UserValidator), handle(UserController.store));
routes.post(
  "/sessions",
  validate(SessionValidator),
  handle(SessionController.store)
);

/**
 * Authenticated Routes
 */

module.exports = routes;
