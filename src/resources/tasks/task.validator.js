const Joi = require('joi');
const { generateValidator } = require('../../common/utils');

const taskValidSchema = Joi.object({
  id: Joi.string().min(1),
  title: Joi.string()
    .min(3)
    .max(255)
    .required(),
  order: Joi.number().min(0),
  description: Joi.string()
    .min(3)
    .max(255),
  userId: Joi.string().min(1),
  boardId: Joi.string().min(1),
  columnId: Joi.string().min(1)
});

const taskValidator = generateValidator(taskValidSchema);

module.exports = taskValidator;
