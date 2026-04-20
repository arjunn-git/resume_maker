const jobs = [
  {
    "id": 1,
    "title": "Frontend Engineer",
    "company": "NextWave Labs",
    "domain": "technical",
    "experience_level": "mid",
    "requiredSkills": ["React", "TypeScript", "CSS", "HTML", "Tailwind CSS"],
    "keywords": ["frontend", "web development", "javascript", "ui"],
    "portalUrl": "https://www.naukri.com/frontend-engineer-jobs"
  },
  {
    "id": 2,
    "title": "UI/UX Developer",
    "company": "BrightSide Studios",
    "domain": "technical",
    "experience_level": "mid",
    "requiredSkills": ["UI/UX", "Figma", "React", "CSS"],
    "keywords": ["design", "user experience", "prototyping", "adobe"],
    "portalUrl": "https://www.linkedin.com/jobs/search/?keywords=UI%2FUX+Developer"
  },
  {
    "id": 3,
    "title": "Full Stack Developer",
    "company": "CloudRoute",
    "domain": "technical",
    "experience_level": "mid",
    "requiredSkills": ["JavaScript", "React", "Node.js", "APIs", "MongoDB"],
    "keywords": ["fullstack", "backend", "database", "api development"],
    "portalUrl": "https://www.naukri.com/full-stack-developer-jobs"
  },
  {
    "id": 4,
    "title": "Junior Frontend Developer",
    "company": "LaunchPad Co.",
    "domain": "technical",
    "experience_level": "entry",
    "requiredSkills": ["HTML", "CSS", "JavaScript", "React"],
    "keywords": ["junior", "entry level", "web development", "frontend"],
    "portalUrl": "https://www.linkedin.com/jobs/search/?keywords=Junior+Frontend+Developer"
  },
  {
    "id": 5,
    "title": "Financial Analyst",
    "company": "Capital Bridge",
    "domain": "finance",
    "experience_level": "mid",
    "requiredSkills": ["Financial Analysis", "Excel", "P&L", "Forecasting", "SAP"],
    "keywords": ["finance", "analysis", "budgeting", "reporting"],
    "portalUrl": "https://www.naukri.com/financial-analyst-jobs"
  },
  {
    "id": 6,
    "title": "Audit Associate",
    "company": "Apex Accounting",
    "domain": "finance",
    "experience_level": "entry",
    "requiredSkills": ["Audit", "Compliance", "IFRS", "Risk Assessment"],
    "keywords": ["audit", "accounting", "compliance", "risk management"],
    "portalUrl": "https://www.linkedin.com/jobs/search/?keywords=Audit+Associate"
  },
  {
    "id": 7,
    "title": "HR Coordinator",
    "company": "PeopleWorks",
    "domain": "hr",
    "experience_level": "entry",
    "requiredSkills": ["Recruitment", "Onboarding", "Employee Relations", "HRIS"],
    "keywords": ["human resources", "recruitment", "onboarding", "employee engagement"],
    "portalUrl": "https://www.naukri.com/hr-coordinator-jobs"
  },
  {
    "id": 8,
    "title": "Operations Executive",
    "company": "LogiChain",
    "domain": "operations",
    "experience_level": "mid",
    "requiredSkills": ["Logistics", "Supply Chain", "Process Improvement", "ERP"],
    "keywords": ["operations", "logistics", "supply chain", "process optimization"],
    "portalUrl": "https://www.linkedin.com/jobs/search/?keywords=Operations+Executive"
  }
]

function getJobs() {
  return jobs
}

function suggestJobs(candidateSkills, preferredDomain = 'technical', resumeText = '') {
  try {
    const normalizedResume = (typeof resumeText === 'string' ? resumeText : String(resumeText || '')).toLowerCase()

    // Detect candidate experience level
    const experienceKeywords = ['experience', 'worked', 'years', 'professional', 'employment', 'job', 'position', 'role']
    const hasExperience = experienceKeywords.some(keyword => normalizedResume.includes(keyword.toLowerCase()))
    const candidateLevel = hasExperience ? 'mid' : 'entry'

    return jobs
      .map(job => {
        const matchedSkills = job.requiredSkills.filter(skill => candidateSkills.includes(skill));
        const skillMatch = job.requiredSkills.length > 0
          ? Math.round((matchedSkills.length / job.requiredSkills.length) * 100)
          : 0;

        const experienceMatch = job.experience_level === candidateLevel ? 100 : 0;

        const matchedKeywords = job.keywords.filter(keyword => normalizedResume.includes(keyword.toLowerCase()));
        const keywordMatch = job.keywords.length > 0
          ? Math.round((matchedKeywords.length / job.keywords.length) * 100)
          : 0;

        const domainMatch = job.domain === preferredDomain ? 100 : 0;

        // Weighted total: skills 60%, experience 20%, keywords 10%, domain 10%
        const totalScore = Math.min(100, Math.round((skillMatch * 0.6) + (experienceMatch * 0.2) + (keywordMatch * 0.1) + (domainMatch * 0.1)))

        // Generate reason for match
        let reasons = [];
        if (skillMatch > 50) reasons.push('Strong skill alignment');
        if (experienceMatch === 100) reasons.push('Experience level matches');
        if (keywordMatch > 50) reasons.push('Relevant keywords found in resume');
        if (domainMatch === 100) reasons.push('Domain preference matches');
        const reason = reasons.length > 0 ? reasons.join(', ') : 'General match based on available criteria';

        return { ...job, matchScore: totalScore, skillMatch, experienceMatch, keywordMatch, domainMatch, reason };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // Top 5 jobs
  } catch (error) {
    console.error('Error in suggestJobs:', error)
    throw new Error('Failed to generate job suggestions')
  }
}

module.exports = {
  getJobs,
  suggestJobs
}