const Joi = require('joi');

// Environment variables validation schema
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  FRONTEND_URL: Joi.string().default('http://localhost:5173'),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: Joi.number().default(100),
  MAX_TEXT_LENGTH: Joi.number().default(50000),
  MIN_TEXT_LENGTH: Joi.number().default(10),
}).unknown(true);

// Validate environment variables
const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Environment validation error: ${error.details[0].message}`);
}

const config = {
  env: value.NODE_ENV,
  port: value.PORT,
  frontendUrl: value.FRONTEND_URL,
  rateLimit: {
    windowMs: value.RATE_LIMIT_WINDOW_MS,
    max: value.RATE_LIMIT_MAX_REQUESTS,
  },
  validation: {
    maxTextLength: value.MAX_TEXT_LENGTH,
    minTextLength: value.MIN_TEXT_LENGTH,
  },
  isDevelopment: value.NODE_ENV === 'development',
  isProduction: value.NODE_ENV === 'production',
  isTest: value.NODE_ENV === 'test',
};

module.exports = config;