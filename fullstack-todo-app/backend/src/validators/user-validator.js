import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(55).required(),
  email: Joi.string().min(6).max(155).required().email(),
  password: Joi.string().min(6).max(50).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(6).max(155).required().email(),
  password: Joi.string().min(6).max(50).required(),
});
