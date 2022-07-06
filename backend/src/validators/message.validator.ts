import Joi from "joi";

export const messageSchema = Joi.object({
  name: Joi.string().trim().min(3).max(255).required(),
  email: Joi.string().trim().email().min(3).max(255).required(),
  message: Joi.string().trim().min(10).max(1024).required(),
});
