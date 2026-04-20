const Joi = require('joi');
const { ValidationError } = require('../utils/errors');

/**
 * Middleware to validate request body against a Joi schema
 * @param {Joi.ObjectSchema} schema - Joi validation schema
 * @param {string} property - Property to validate (default: 'body')
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Return all errors
      stripUnknown: true, // Remove unknown properties
      convert: true, // Convert types
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message.replace(/"/g, ''))
        .join(', ');

      return next(new ValidationError(`Validation failed: ${errorMessage}`));
    }

    // Replace request property with validated value
    req[property] = value;
    next();
  };
};

/**
 * Middleware to sanitize string inputs
 */
const sanitizeInput = (req, res, next) => {
  // Recursively sanitize string properties
  const sanitize = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove potentially dangerous characters but keep basic punctuation
        obj[key] = obj[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};

module.exports = {
  validate,
  sanitizeInput,
};