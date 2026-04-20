// Comprehensive skills pool across domains
const SKILLS_BY_DOMAIN = {
  technical: ['React', 'Vue', 'Angular', 'Next.js', 'Tailwind', 'CSS', 'HTML', 'JavaScript', 'TypeScript', 'Svelte', 'Node', 'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'Go', 'Rust', 'PHP', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'DynamoDB', 'Cassandra', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'Git', 'REST', 'GraphQL', 'Webpack', 'Vite', 'Jest', 'Cypress', 'Linux'],
  finance: ['Financial Analysis', 'Excel', 'P&L', 'Forecasting', 'SAP', 'Reconciliation', 'Audit', 'IFRS', 'Risk Assessment', 'Balance Sheet', 'Cash Flow', 'Accounts Payable', 'Accounts Receivable', 'Budgeting', 'RTM', 'RTR', 'Record to Report', 'Record to Market'],
  hr: ['Recruitment', 'Onboarding', 'Employee Relations', 'HRIS', 'Talent Acquisition', 'Payroll', 'Performance Management'],
  marketing: ['SEO', 'Content Marketing', 'Social Media', 'Branding', 'Campaign Management', 'Google Analytics', 'PPC'],
  operations: ['Logistics', 'Supply Chain', 'Procurement', 'ERP', 'Process Improvement', 'Inventory Management'],
  design: ['UI', 'UX', 'Figma', 'Sketch', 'Adobe Photoshop', 'Adobe Illustrator', 'Product Design']
}

const logger = require('../utils/logger');

const DOMAIN_KEYWORDS = {
  finance: ['finance', 'accounting', 'audit', 'reconciliation', 'p&l', 'rtm', 'rtr', 'record to report', 'budget', 'tax', 'payroll'],
  hr: ['human resources', 'hr', 'recruitment', 'talent', 'onboarding'],
  marketing: ['marketing', 'seo', 'content', 'social media', 'brand', 'campaign'],
  operations: ['operations', 'logistics', 'supply chain', 'procurement'],
  design: ['design', 'ui', 'ux', 'graphic', 'product design'],
  technical: ['software', 'development', 'engineering', 'it', 'programming', 'web']
}

const ALL_SKILLS = Object.values(SKILLS_BY_DOMAIN).flat()

function escapeRegExp(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function analyzeResume(text = '') {
  try {
    logger.debug('Starting resume analysis', { textLength: text?.length });

    // Input validation
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid input: text must be a non-empty string');
    }

    if (text.length < 10) {
      throw new Error('Text too short: minimum 10 characters required');
    }

    if (text.length > 50000) {
      throw new Error('Text too long: maximum 50000 characters allowed');
    }

    const normalizedText = text.toLowerCase().trim();

    if (!normalizedText) {
      throw new Error('Text contains no valid content after normalization');
    }

    // Detect skills using word boundary matching to avoid incorrect partial matches
    const detected = ALL_SKILLS.filter(s => {
      const pattern = new RegExp(`\\b${escapeRegExp(s.toLowerCase())}\\b`, 'i')
      return pattern.test(normalizedText)
    })
    const skills = Array.from(new Set(detected)).slice(0, 10)

    // Missing skills (guided by candidate categories)
    const categoryMap = Object.entries(SKILLS_BY_DOMAIN).reduce((acc, [category, skillList]) => {
      skillList.forEach(skill => {
        acc[skill.toLowerCase()] = category
      })
      return acc
    }, {})

    const detectedCategories = Array.from(new Set(detected.map(skill => categoryMap[skill.toLowerCase()] || 'other')))

    // Domain detection from keywords and skills
    const domainFromKeywords = Object.entries(DOMAIN_KEYWORDS).find(([domain, words]) =>
      words.some(word => normalizedText.includes(word.toLowerCase()))
    )?.[0]

    // Prioritize domain with most detected skills
    const domainCounts = detected.reduce((acc, skill) => {
      const domain = categoryMap[skill.toLowerCase()] || 'other'
      acc[domain] = (acc[domain] || 0) + 1
      return acc
    }, {})
    const domainFromSkills = Object.entries(domainCounts).sort((a,b) => b[1]-a[1])[0]?.[0]

    const detectedDomain = domainFromKeywords || domainFromSkills || (detected.length ? 'technical' : 'general')

    // If no skills detected, suggest common foundational developer skills
    const baseMissing = detected.length === 0
      ? ['Resume Writing', 'Attention to Detail', 'Quantified Results', 'Keywords', 'Industry Domain', 'Communication']
      : ALL_SKILLS.filter(s => !detected.includes(s))

    const domainPriorityList = detectedCategories.length > 0 ? detectedCategories : ['technical', 'finance', 'hr', 'marketing', 'operations', 'design']
    if (!domainPriorityList.includes(detectedDomain)) domainPriorityList.unshift(detectedDomain)

    const prioritizedMissing = []
    domainPriorityList.forEach(cat => {
      const skillsInCat = SKILLS_BY_DOMAIN[cat] || []
      skillsInCat.forEach(skill => {
        if (!detected.includes(skill) && !prioritizedMissing.includes(skill)) {
          prioritizedMissing.push(skill)
        }
      })
    })

    const missing = prioritizedMissing.length > 0 ? prioritizedMissing.slice(0, 8) : baseMissing.slice(0, 8)

    const domain = detectedDomain === 'technical' ? 'technical' : detectedDomain || 'general'

    // Calculate ATS score with bounds checking
    let score = 30;
    score += Math.min(35, Math.max(0, skills.length * 3)); // skills bonus

    const domainScore = domain && domain !== 'general' ? 10 : 0;
    score += domainScore;

    const hasExperienceSection = /experience|employment|work|professional/i.test(normalizedText);
    if (hasExperienceSection) score += 10;

    const hasEducation = /education|degree|university|college|bachelor|master/i.test(normalizedText);
    if (hasEducation) score += 8;

    const hasProjects = /project|built|developed|created|implemented/i.test(normalizedText);
    if (hasProjects) score += 7;

    const hasMetrics = /[0-9]+%|increased|improved|reduced|grew|scaled/i.test(normalizedText);
    if (hasMetrics) score += 5;

    // Add deterministic content depth score (0-5)
    score += Math.min(5, Math.max(0, Math.floor(normalizedText.length / 400)));
    score = Math.min(95, Math.max(20, score));

    // Generate intelligent suggestions
    const suggestions = []
    if (skills.length < 4) suggestions.push(`Add more ${domain} skills for improved ATS matching.`)
    if (!hasExperienceSection) suggestions.push('Include an Experience section with job titles and responsibilities.')
    if (!hasEducation) suggestions.push('Add your education details (degree, school, graduation year).')
    if (!hasProjects && domain === 'technical') suggestions.push('Add a Projects section with actionable accomplishments using power verbs.')
    if (!hasMetrics) suggestions.push('Quantify your impact with metrics (e.g., "improved performance by 40%").')
    if (text.length < 300) suggestions.push('Expand your resume with more details about achievements and roles.')
    if (!normalizedText.includes('summary') && !normalizedText.includes('objective')) {
      suggestions.push('Consider adding a professional summary highlighting key strengths.')
    }

    // Skill-specific suggestions based on missing skills
    missing.slice(0, 5).forEach(skill => {
      const category = categoryMap[skill.toLowerCase()] || 'general'
      suggestions.push(`Add ${skill} (${category}) for stronger resume targeting.`)
    })

    return {
      score: Math.round(score),
      skills,
      missing,
      suggestions,
      domain
    };
  } catch (error) {
    logger.error('Error analyzing resume', { error: error.message, textLength: text?.length });
    throw error;
  }
}

function matchJob(resumeText = '', jobText = '') {
  try {
    logger.debug('Starting job matching', { resumeLength: resumeText?.length, jobLength: jobText?.length });

    // Input validation
    if (!resumeText || typeof resumeText !== 'string') {
      throw new Error('Invalid resume text: must be a non-empty string');
    }

    if (!jobText || typeof jobText !== 'string') {
      throw new Error('Invalid job text: must be a non-empty string');
    }

    if (resumeText.length < 10 || jobText.length < 10) {
      throw new Error('Text too short: minimum 10 characters required for both resume and job description');
    }

    if (resumeText.length > 50000 || jobText.length > 50000) {
      throw new Error('Text too long: maximum 50000 characters allowed');
    }

    const normalizedResume = resumeText.toLowerCase().trim();
    const normalizedJob = jobText.toLowerCase().trim();

    if (!normalizedJob.trim()) {
      throw new Error('Job description contains no valid content');
    }

    // Analyze job description to extract required skills
    const jobAnalysis = analyzeResume(normalizedJob)
    const jobSkills = jobAnalysis.skills

    // Get candidate skills from resume
    const resumeAnalysis = analyzeResume(normalizedResume)
    const candidateSkills = resumeAnalysis.skills

    // Matched and missing skills
    const matchedSkills = jobSkills.filter(skill => candidateSkills.includes(skill))
    const missingSkills = jobSkills.filter(skill => !candidateSkills.includes(skill))

    // Match percentage based on skills
    const percent = jobSkills.length > 0
      ? Math.round((matchedSkills.length / jobSkills.length) * 100)
      : 0

    // Generate suggestions and roadmap
    const suggestions = []
    if (missingSkills.length > 0) {
      suggestions.push(`Consider learning the following skills to improve match: ${missingSkills.slice(0, 3).join(', ')}`)
    }
    if (percent < 50) {
      suggestions.push('Your resume may need tailoring to this specific job description.')
    }

    // Skill gap roadmap
    const roadmap = generateSkillRoadmap(missingSkills)

    return {
      percent: Math.min(100, Math.max(0, percent)),
      matchedSkills,
      missingSkills,
      suggestions,
      roadmap
    }
  } catch (error) {
    logger.error('Error matching job', { error: error.message, resumeLength: resumeText?.length, jobLength: jobText?.length });
    throw error;
  }
}

function generateSkillRoadmap(missingSkills) {
  return missingSkills.map(skill => ({
    skill,
    steps: [
      `Learn ${skill} through online courses (e.g., Udemy, Coursera, freeCodeCamp)`,
      `Build a small project or practice exercise using ${skill}`,
      `Add ${skill} to your resume under skills section or projects`,
      `Gain practical experience by contributing to open-source or personal projects`
    ]
  }))
}

module.exports = {
  analyzeResume,
  matchJob,
  generateSkillRoadmap
}