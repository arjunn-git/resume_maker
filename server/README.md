# Resume Analyzer Backend

Node.js/Express backend for the AI Resume Analyzer application.

## Features

- Resume analysis API with skill detection and ATS scoring
- Job matching against pasted job descriptions
- Intelligent job suggestions with weighted scoring
- Skill gap analysis and learning roadmaps
- Security middleware (helmet, rate limiting, CORS)
- Input validation with Joi
- Error handling and logging

## Installation

```bash
cd server
npm install
```

## Running

```bash
# Development
npm run dev

# Production
npm start
```

The server runs on port 5000 by default.

## API Endpoints

### POST /api/analyze-resume
Analyzes a resume text and returns skills, ATS score, suggestions, and domain.

**Request Body:**
```json
{
  "text": "Resume text content..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 75,
    "skills": ["React", "JavaScript", "Node.js"],
    "missing": ["TypeScript", "MongoDB"],
    "suggestions": ["Add more technical skills"],
    "domain": "technical"
  }
}
```

### POST /api/match-job
Compares resume with a job description.

**Request Body:**
```json
{
  "resumeText": "Resume content...",
  "jobText": "Job description..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "percent": 85,
    "matchedSkills": ["React", "JavaScript"],
    "missingSkills": ["TypeScript"],
    "suggestions": ["Consider learning TypeScript"],
    "roadmap": [...]
  }
}
```

### GET /api/jobs
Returns available job listings.

### POST /api/suggest-jobs
Returns personalized job suggestions.

**Request Body:**
```json
{
  "candidateSkills": ["React", "JavaScript"],
  "preferredDomain": "technical",
  "resumeText": "Resume content..."
}
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)
- `NODE_ENV`: Environment mode

## Security

- Rate limiting: 100 requests per 15 minutes per IP
- Helmet for security headers
- Input validation and sanitization
- CORS configuration
- Error message sanitization in production