const Joi = require('joi');
const { generateValidator } = require('../../common/utils');

const userValidSchema = Joi.object({
  id: Joi.string().min(1),
  login: Joi.string()
    .min(3)
    .max(50)
    .required(),
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),
  password: Joi.string()
    .min(3)
    .max(50)
    .required()
});

const userValidator = generateValidator(userValidSchema);

module.exports = userValidator;
