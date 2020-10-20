const { Joi } = require("express-validation");

module.exports = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
