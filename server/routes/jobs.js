const express = require('express');
const { getJobs, suggestJobs } = require('../services/jobService');
const { validate } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const { success } = require('../utils/response');
const schemas = require('../utils/validationSchemas');

const router = express.Router();

// GET /api/jobs
router.get('/jobs',
  asyncHandler(async (req, res) => {
    const jobs = getJobs();
    success(res, jobs, 'Jobs retrieved successfully');
  })
);

// POST /api/suggest-jobs
router.post('/suggest-jobs',
  validate(schemas.suggestJobs),
  asyncHandler(async (req, res) => {
    const { candidateSkills, preferredDomain, resumeText } = req.body;

    const suggestions = suggestJobs(candidateSkills, preferredDomain, resumeText);

    success(res, suggestions, 'Job suggestions generated successfully');
  })
);

module.exports = router;