const express = require('express');
const {
  analyzeResume,
  matchJob,
  parseResumeToStructured,
  optimizeResumeWithAI
} = require('../services/analysisService');
const { validate } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const { success } = require('../utils/response');
const schemas = require('../utils/validationSchemas');

const router = express.Router();

// POST /api/analyze-resume
router.post('/analyze-resume',
  validate(schemas.analyzeResume),
  asyncHandler(async (req, res) => {
    const { text, preferredDomain } = req.body;
    const analysis = analyzeResume(text, preferredDomain);
    success(res, analysis, 'Resume analyzed successfully');
  })
);

// POST /api/parse-resume
router.post('/parse-resume',
  validate(schemas.parseResume),
  asyncHandler(async (req, res) => {
    const { text, preferredDomain } = req.body;
    const structured = parseResumeToStructured(text, preferredDomain);
    const analysis = analyzeResume(text, preferredDomain);
    success(res, { structured, analysis }, 'Resume parsed into structured studio data successfully');
  })
);

// POST /api/optimize-resume
router.post('/optimize-resume',
  validate(schemas.optimizeResume),
  asyncHandler(async (req, res) => {
    const { resumeData, preferredDomain, targetJob } = req.body;
    const result = optimizeResumeWithAI(resumeData, preferredDomain, targetJob);
    success(res, result, 'Resume optimized with AI successfully');
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
