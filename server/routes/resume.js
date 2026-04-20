const express = require('express');
const { analyzeResume, matchJob } = require('../services/analysisService');
const { validate } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const { success } = require('../utils/response');
const schemas = require('../utils/validationSchemas');

const router = express.Router();

// POST /api/analyze-resume
router.post('/analyze-resume',
  validate(schemas.analyzeResume),
  asyncHandler(async (req, res) => {
    const { text } = req.body;

    const analysis = analyzeResume(text);

    success(res, analysis, 'Resume analyzed successfully');
  })
);

// POST /api/match-job
router.post('/match-job',
  validate(schemas.matchJob),
  asyncHandler(async (req, res) => {
    const { resumeText, jobText } = req.body;

    const match = matchJob(resumeText, jobText);

    success(res, match, 'Job matching completed successfully');
  })
);

module.exports = router;