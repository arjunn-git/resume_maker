const Joi = require('joi');
const config = require('../config/config');

// Common validation rules
const textValidation = Joi.string()
  .min(config.validation.minTextLength)
  .max(config.validation.maxTextLength)
  .trim();

// Validation schemas
const schemas = {
  // Resume analysis
  analyzeResume: Joi.object({
    text: textValidation.required(),
  }),

  // Job matching
  matchJob: Joi.object({
    resumeText: textValidation.required(),
    jobText: textValidation.required(),
  }),

  // Job suggestions
  suggestJobs: Joi.object({
    candidateSkills: Joi.array().items(Joi.string().trim().min(1)).min(1).required(),
    preferredDomain: Joi.string().valid('technical', 'finance', 'hr', 'marketing', 'operations', 'design').default('technical'),
    resumeText: textValidation.optional(),
  }),

  // Health check (no validation needed)
  health: Joi.object({}),
};

module.exports = schemas;