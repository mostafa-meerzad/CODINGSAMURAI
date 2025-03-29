import Joi from "joi";

export const todoSchema = Joi.object({
  task: Joi.string().required()
});

export const todoUpdateSchema = Joi.object({
  task: Joi.string().optional(),
  isCompleted: Joi.boolean().optional()
});
