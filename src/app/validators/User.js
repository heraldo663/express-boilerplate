const { Joi } = require("express-validation");

module.exports = {
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required().min(6),
  }),
};
