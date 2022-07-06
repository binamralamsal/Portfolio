import Joi from "joi";
import mongoose from "mongoose";

export const tagSchema = Joi.object({
  name: Joi.string().trim().max(255).min(3).required(),
  url: Joi.string().trim().max(1024).min(3).required(),
});

export const projectSchema = Joi.object({
  name: Joi.string().trim().max(255).min(5).required(),
  description: Joi.string().trim().max(1024).min(5).required(),
  thumbnail: Joi.string().lowercase().trim().max(255).min(5).required(),
  videoUrl: Joi.string().trim().max(1024).min(5),
  githubUrl: Joi.string().trim().max(1024).min(5).required(),
  liveUrl: Joi.string().trim().max(1024).min(5).required(),
  tags: Joi.array()
    .default([])
    .custom((values, helpers) => {
      for (const value of values) {
        const isValid = mongoose.isObjectIdOrHexString(value);
        if (!isValid)
          return helpers.error("invalidObjectId", {
            value,
          });
      }

      return values;
    }, "Wrong ObjectId")
    .messages({ invalidObjectId: "Wrong ObjectId" }),
  featured: Joi.boolean().default(false),
});
