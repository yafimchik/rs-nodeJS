const Joi = require('joi');
const { generateValidator } = require('../../common/utils');

const boardValidSchema = Joi.object({
  id: Joi.string().min(1),
  title: Joi.string()
    .min(3)
    .max(255)
    .required(),
  columns: Joi.object({
    id: Joi.string(),
    title: Joi.string()
      .min(3)
      .max(255)
      .required(),
    order: Joi.number().min(0)
  })
});

const boardValidator = generateValidator(boardValidSchema);

module.exports = boardValidator;
