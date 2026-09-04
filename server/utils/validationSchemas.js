const Joi = require('joi');
const config = require('../config/config');

const textValidation = Joi.string()
  .min(config.validation.minTextLength)
  .max(config.validation.maxTextLength)
  .trim();

const schemas = {
  analyzeResume: Joi.object({
    text: textValidation.required(),
    preferredDomain: Joi.string().optional().allow('', null)
  }),

  parseResume: Joi.object({
    text: textValidation.required(),
    preferredDomain: Joi.string().optional().allow('', null)
  }),

  optimizeResume: Joi.object({
    resumeData: Joi.object().required(),
    preferredDomain: Joi.string().optional().allow('', null),
    targetJob: Joi.string().optional().allow('', null)
  }),

  matchJob: Joi.object({
    resumeText: textValidation.required(),
    jobText: textValidation.required(),
  }),

  suggestJobs: Joi.object({
    candidateSkills: Joi.array().items(Joi.string().trim().min(1)).min(1).required(),
    preferredDomain: Joi.string().optional().default('technical'),
    resumeText: textValidation.optional(),
  }),

  health: Joi.object({}),
};

module.exports = schemas;
