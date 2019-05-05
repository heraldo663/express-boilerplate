const nodemailer = require("nodemailer");
const path = require("path");
const expHbs = require("express-handlebars");
const mailHbs = require("nodemailer-express-handlebars");
const config = require("../../config");

const trasnport = nodemailer.createTransport(config.mail);

const viewPath = path.resolve(__dirname, "..", "views", "emails");

trasnport.use(
  "compile",
  mailHbs({
    viewEngine: expHbs.create({
      partialsDir: path.resolve(viewPath, "partials")
    }),
    viewPath,
    extName: ".hbs"
  })
);

module.exports = trasnport;
