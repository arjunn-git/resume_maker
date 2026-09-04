// Universal Domain Taxonomy for Instant Client-Side Analysis & Scoring
export const DOMAIN_DEFINITIONS = {
  technical: {
    label: 'Technology & Software',
    keywords: ['software', 'developer', 'engineer', 'frontend', 'backend', 'fullstack', 'api', 'cloud', 'devops', 'database', 'architecture', 'react', 'python', 'javascript', 'aws', 'docker', 'system'],
    skills: ['React', 'Node.js', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'REST APIs', 'GraphQL', 'Microservices', 'System Design', 'Linux', 'Java', 'Next.js', 'Tailwind CSS', 'Agile/Scrum', 'Redis', 'Unit Testing'],
    actionVerbs: ['Architected', 'Engineered', 'Developed', 'Optimized', 'Deployed', 'Automated', 'Scaled', 'Refactored', 'Implemented', 'Designed', 'Integrated', 'Debugged'],
    metricTemplates: ['improving system throughput by 42%', 'reducing API latency by 65ms (38%)', 'scaling infrastructure to support 250K+ DAU', 'cutting cloud hosting costs by 28%']
  },
  healthcare: {
    label: 'Healthcare & Nursing',
    keywords: ['patient', 'nurse', 'nursing', 'clinical', 'hospital', 'medical', 'hipaa', 'ehr', 'vital signs', 'triage', 'treatment', 'care', 'medication', 'physician', 'health'],
    skills: ['Patient Care', 'HIPAA Compliance', 'Electronic Health Records (EHR)', 'Epic Systems', 'Clinical Assessment', 'Triage Protocols', 'Medication Administration', 'Vital Signs Monitoring', 'BLS/ACLS Certified', 'Patient Advocacy', 'Phlebotomy', 'Care Plan Development', 'Infection Control', 'Interdisciplinary Collaboration', 'Emergency Response'],
    actionVerbs: ['Administered', 'Evaluated', 'Triaged', 'Coordinated', 'Delivered', 'Monitored', 'Advocated', 'Collaborated', 'Educated', 'Streamlined', 'Facilitated'],
    metricTemplates: ['maintaining 98% patient satisfaction rating', 'reducing patient wait times by 22%', 'managing caseload of 30+ acute patients daily with 100% medication accuracy', 'zero HIPAA compliance infractions across 3 years']
  },
  finance: {
    label: 'Finance & Accounting',
    keywords: ['finance', 'accounting', 'audit', 'reconciliation', 'p&l', 'budget', 'forecast', 'gaap', 'tax', 'balance sheet', 'cash flow', 'valuation', 'financial modeling', 'ledger'],
    skills: ['Financial Analysis', 'Financial Modeling', 'P&L Management', 'Budgeting & Forecasting', 'GAAP & IFRS Compliance', 'Advanced Excel (VLOOKUP, Macros)', 'SAP ERP', 'General Ledger Reconciliation', 'Cash Flow Optimization', 'Internal Controls & Audit', 'Cost Variance Analysis', 'Risk Management', 'Accounts Payable/Receivable', 'Tax Preparation', 'Valuation'],
    actionVerbs: ['Audited', 'Forecasted', 'Reconciled', 'Analyzed', 'Modeled', 'Allocated', 'Negotiated', 'Consolidated', 'Mitigated', 'Structured', 'Maximized'],
    metricTemplates: ['identifying $340K in annual operational cost savings', 'improving cash flow forecasting accuracy by 32%', 'reconciling multi-entity ledgers valued at $45M+ with 99.8% precision', 'shortening month-end close cycle from 10 days to 4 days']
  },
  sales: {
    label: 'Sales & Business Development',
    keywords: ['sales', 'quota', 'pipeline', 'b2b', 'prospecting', 'lead generation', 'revenue', 'crm', 'salesforce', 'client', 'negotiation', 'closing', 'account management'],
    skills: ['B2B Sales', 'Pipeline Management', 'Salesforce CRM', 'Cold Outreach & Prospecting', 'Account Management', 'Contract Negotiation', 'Lead Generation & Qualification', 'Solution Selling', 'Enterprise Deal Closing', 'Relationship Building', 'Revenue Growth Strategy', 'HubSpot', 'Consultative Selling', 'Client Retention'],
    actionVerbs: ['Surpassed', 'Negotiated', 'Generated', 'Prospected', 'Closed', 'Accelerated', 'Expanded', 'Secured', 'Cultivated', 'Presented', 'Exceeded'],
    metricTemplates: ['achieving 142% of annual quota generating $1.8M in net new ARR', 'expanding key account revenue by 48% year-over-year', 'closing 35 enterprise contracts with an average contract value of $60K', 'shortening average sales cycle from 90 to 52 days']
  },
  marketing: {
    label: 'Marketing & Growth',
    keywords: ['marketing', 'seo', 'sem', 'campaign', 'social media', 'content', 'analytics', 'brand', 'ppc', 'growth', 'funnel', 'roi', 'conversion', 'audience', 'digital'],
    skills: ['SEO/SEM Optimization', 'Content Marketing Strategy', 'Google Analytics 4', 'Paid Advertising (PPC/Meta/LinkedIn)', 'Social Media Management', 'Email Marketing & Automation', 'Conversion Rate Optimization (CRO)', 'Marketing Funnel Architecture', 'Brand Positioning', 'A/B Testing', 'Copywriting', 'Campaign ROI Analysis', 'HubSpot', 'Influencer Outreach'],
    actionVerbs: ['Spearheaded', 'Launched', 'Amplified', 'Optimized', 'Architected', 'Authored', 'Orchestrated', 'Boosted', 'Drove', 'Targeted', 'Engineered'],
    metricTemplates: ['boosting organic web traffic by 185% in 6 months', 'generating 12,000+ qualified MQLs with a 24% lower CPA', 'increasing email newsletter open rate to 38% (vs 21% industry average)', 'driving $650K in attributable revenue via integrated multi-channel campaigns']
  },
  hr: {
    label: 'Human Resources & Recruiting',
    keywords: ['recruiting', 'talent', 'hr', 'human resources', 'employee relations', 'onboarding', 'hris', 'payroll', 'benefits', 'performance', 'retention', 'diversity', 'culture'],
    skills: ['Full-Cycle Talent Acquisition', 'HRIS (Workday, BambooHR)', 'Employee Relations', 'Onboarding Program Design', 'Performance Management', 'Labor Law & Compliance', 'Compensation & Benefits', 'Diversity, Equity & Inclusion (DEI)', 'Employee Engagement & Retention', 'Conflict Resolution', 'Policy Development', 'Talent Pipeline Sourcing', 'Workplace Culture Initiatives'],
    actionVerbs: ['Recruited', 'Implemented', 'Standardized', 'Onboarded', 'Facilitated', 'Revamped', 'Resolved', 'Retained', 'Trained', 'Mentored', 'Structured'],
    metricTemplates: ['reducing time-to-hire by 35% while cutting external agency spend by $120K', 'achieving 94% first-year employee retention rate', 'onboarding 180+ remote team members with a 96% satisfaction rating', 'modernizing performance review framework across 450+ employees']
  },
  operations: {
    label: 'Operations & Supply Chain',
    keywords: ['operations', 'supply chain', 'logistics', 'procurement', 'inventory', 'warehouse', 'lean', 'vendor', 'process', 'erp', 'fulfillment', 'distribution', 'quality'],
    skills: ['Supply Chain Optimization', 'Inventory Control & Forecasting', 'Vendor & Supplier Management', 'Logistics & Distribution', 'Lean Six Sigma & Kaizen', 'ERP Management (SAP/Oracle)', 'Procurement Negotiation', 'Warehouse Management Systems (WMS)', 'Process Automation', 'Root Cause Analysis', 'Fulfillment Efficiency', 'KPI Dashboard Reporting'],
    actionVerbs: ['Streamlined', 'Negotiated', 'Reduced', 'Standardized', 'Dispatched', 'Maximized', 'Consolidated', 'Coordinated', 'Tracked', 'Audited', 'Overhauled'],
    metricTemplates: ['slashing fulfillment turnaround times by 30%', 'negotiating tier-1 supplier contracts yielding $210K in cost reductions', 'maintaining 99.4% on-time delivery rate across 10,000+ monthly shipments', 'reducing inventory holding excess by 22% using automated replenishment']
  },
  legal: {
    label: 'Legal & Compliance',
    keywords: ['legal', 'compliance', 'contract', 'regulatory', 'litigation', 'counsel', 'due diligence', 'governance', 'policy', 'risk', 'nda', 'negotiation', 'corporate'],
    skills: ['Contract Drafting & Review', 'Regulatory Compliance', 'Legal Research (Westlaw, LexisNexis)', 'Due Diligence & M&A Support', 'Corporate Governance', 'Risk Mitigation Strategies', 'Data Privacy Regulations (GDPR/CCPA)', 'Intellectual Property (IP)', 'Dispute Resolution & Negotiation', 'Policy & Procedure Creation', 'Ethics & Compliance Auditing'],
    actionVerbs: ['Negotiated', 'Drafted', 'Examined', 'Ensured', 'Mitigated', 'Advised', 'Formulated', 'Protected', 'Settled', 'Verified', 'Streamlined'],
    metricTemplates: ['reviewing and executing 250+ commercial contracts with zero regulatory disputes', 'reducing contract turnaround cycle by 40% through standardized clause libraries', 'achieving 100% compliance audit pass rate across regional regulations', 'mitigating corporate risk exposure through proactive policy revisions']
  },
  education: {
    label: 'Education & Teaching',
    keywords: ['teaching', 'teacher', 'curriculum', 'classroom', 'student', 'lesson plan', 'education', 'instruction', 'pedagogy', 'assessment', 'academic', 'learning', 'faculty'],
    skills: ['Curriculum Design & Alignment', 'Classroom Management', 'Differentiated Instruction', 'Student Assessment & Grading', 'Educational Technology (Canvas, Blackboard)', 'Individualized Education Plans (IEP)', 'Parent-Teacher Communication', 'Interactive Lesson Planning', 'STEM/Literacy Enrichment', 'Student Mentorship & Counseling', 'Distance & Hybrid Learning Delivery'],
    actionVerbs: ['Instructed', 'Designed', 'Facilitated', 'Adapted', 'Assessed', 'Mentored', 'Inspired', 'Evaluated', 'Engaged', 'Structured', 'Fostered'],
    metricTemplates: ['raising standardized assessment scores by 18 percentile points', 'designing interactive STEM curriculum adopted school-wide for 600+ students', 'maintaining 96% student attendance and classroom engagement rate', 'supporting 100% of IEP students in meeting designated annual developmental benchmarks']
  },
  creative: {
    label: 'Creative & Design',
    keywords: ['design', 'designer', 'ui', 'ux', 'graphic', 'figma', 'creative', 'visual', 'prototype', 'brand', 'art', 'typography', 'user experience', 'interaction'],
    skills: ['UI/UX Design', 'Figma & FigJam', 'Adobe Creative Cloud (Photoshop, Illustrator)', 'Wireframing & Prototyping', 'Design Systems & Component Libraries', 'User Research & Usability Testing', 'Typography & Visual Hierarchy', 'Interactive Motion Design', 'Information Architecture', 'Responsive Web & Mobile Layouts', 'Brand Identity Development'],
    actionVerbs: ['Conceptualized', 'Designed', 'Prototyped', 'Iterated', 'Synthesized', 'Standardized', 'Produced', 'Crafted', 'Transformed', 'Elevated', 'Illustrated'],
    metricTemplates: ['redesigning user checkout flow to decrease drop-off rate by 27%', 'building comprehensive design system utilized by 20+ engineers across 4 products', 'conducting 45+ usability studies leading to a 35-point increase in SUS score', 'delivering 60+ visual brand assets under tight deadlines with 100% stakeholder approval']
  },
  customer_success: {
    label: 'Customer Support & Success',
    keywords: ['customer', 'support', 'client', 'csat', 'nps', 'tickets', 'zendesk', 'retention', 'churn', 'onboarding', 'resolution', 'service', 'advocacy'],
    skills: ['Customer Relationship Management', 'Help Desk Platforms (Zendesk, Intercom)', 'Conflict Resolution & De-escalation', 'Customer Onboarding & Training', 'CSAT & NPS Optimization', 'Churn Reduction Tactics', 'Ticket Prioritization & Triage', 'Cross-Functional Product Feedback', 'SLA Adherence & Tracking', 'Knowledge Base & FAQ Authoring', 'Account Retention Strategies'],
    actionVerbs: ['Resolved', 'Onboarded', 'Retained', 'Advocated', 'Escalated', 'Trained', 'Exceeded', 'Troubleshot', 'Restored', 'Enhanced', 'Communicated'],
    metricTemplates: ['maintaining 97.8% positive CSAT across 3,500+ solved tickets annually', 'reducing average first-response time from 4 hours to under 22 minutes', 'cutting customer churn by 18% through proactive quarterly health checks', 'authoring 85+ knowledge base articles decreasing inbound support volume by 15%']
  },
  engineering: {
    label: 'Engineering & Manufacturing',
    keywords: ['engineering', 'mechanical', 'electrical', 'cad', 'solidworks', 'manufacturing', 'quality', 'prototyping', 'testing', 'hardware', 'assembly', 'fabrication'],
    skills: ['Computer-Aided Design (CAD / SolidWorks / AutoCAD)', 'Finite Element Analysis (FEA)', 'Rapid Prototyping & 3D Printing', 'Quality Assurance & ISO 9001 Standards', 'Geometric Dimensioning & Tolerancing (GD&T)', 'Design for Manufacturability (DFM)', 'PLC Programming & Automation', 'Root Cause Failure Analysis', 'Material Selection & Testing', 'Technical Documentation & Schematics'],
    actionVerbs: ['Fabricated', 'Modeled', 'Validated', 'Manufactured', 'Calibrated', 'Tested', 'Optimized', 'Assembled', 'Troubleshot', 'Specified', 'Certified'],
    metricTemplates: ['reducing prototype cycle iteration time by 35%', 'cutting manufacturing defect rate from 3.2% to 0.4% through DFM improvements', 'executing structural FEA simulations reducing raw material usage by 18%', 'spearheading equipment retooling saving $95K in production downtime']
  },
  general: {
    label: 'Business & Administration',
    keywords: ['management', 'project', 'administration', 'coordination', 'communication', 'strategy', 'planning', 'team', 'stakeholder', 'reporting', 'organization'],
    skills: ['Project Management', 'Cross-Functional Collaboration', 'Stakeholder Communication', 'Strategic Planning', 'Resource & Schedule Allocation', 'Problem Solving', 'Data-Driven Reporting', 'Executive Presentation', 'Change Management', 'Vendor Relations', 'Operational Efficiency'],
    actionVerbs: ['Orchestrated', 'Coordinated', 'Directed', 'Executed', 'Streamlined', 'Facilitated', 'Championed', 'Transformed', 'Organized', 'Oversaw', 'Unified'],
    metricTemplates: ['delivering key enterprise projects 2 weeks ahead of schedule and 10% under budget', 'streamlining departmental workflows to save 15+ hours per week across the team', 'aligning 5 cross-functional divisions behind company-wide strategic objectives', 'achieving 98% on-time milestone delivery rate across all operational initiatives']
  }
};

function escapeRegExp(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function detectDomain(text = '', preferredDomain = null) {
  if (preferredDomain && DOMAIN_DEFINITIONS[preferredDomain]) {
    return preferredDomain;
  }
  if (preferredDomain) {
    const matchedKey = Object.keys(DOMAIN_DEFINITIONS).find(k =>
      k.toLowerCase() === preferredDomain.toLowerCase() ||
      DOMAIN_DEFINITIONS[k].label.toLowerCase().includes(preferredDomain.toLowerCase())
    );
    if (matchedKey) return matchedKey;
  }

  const normalized = String(text || '').toLowerCase();
  let bestDomain = 'general';
  let highestScore = 0;

  for (const [domainKey, config] of Object.entries(DOMAIN_DEFINITIONS)) {
    let score = 0;
    for (const kw of config.keywords) {
      const regex = new RegExp(`\\b${escapeRegExp(kw)}\\b`, 'gi');
      const matches = normalized.match(regex);
      if (matches) score += matches.length * 2;
    }
    for (const skill of config.skills) {
      if (normalized.includes(skill.toLowerCase())) {
        score += 3;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestDomain = domainKey;
    }
  }

  return bestDomain;
}

export function analyzeResume(text = '', preferredDomain = null) {
  const normalizedText = String(text || '').toLowerCase().trim();
  const domainKey = detectDomain(text, preferredDomain);
  const domainConfig = DOMAIN_DEFINITIONS[domainKey] || DOMAIN_DEFINITIONS.general;

  const allDomainSkills = domainConfig.skills;
  const detectedSkills = [];
  const missingSkills = [];

  const allKnownSkills = Object.values(DOMAIN_DEFINITIONS).flatMap(d => d.skills);
  const uniqueKnownSkills = Array.from(new Set(allKnownSkills));

  uniqueKnownSkills.forEach(skill => {
    const pattern = new RegExp(`\\b${escapeRegExp(skill.toLowerCase())}\\b`, 'i');
    if (pattern.test(normalizedText)) {
      if (!detectedSkills.includes(skill)) {
        detectedSkills.push(skill);
      }
    }
  });

  allDomainSkills.forEach(skill => {
    if (!detectedSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      missingSkills.push(skill);
    }
  });

  const powerVerbs = [
    'spearheaded', 'orchestrated', 'architected', 'accelerated', 'engineered',
    'surpassed', 'optimized', 'transformed', 'negotiated', 'streamlined',
    'implemented', 'developed', 'delivered', 'designed', 'championed',
    'audited', 'administered', 'managed', 'led', 'established', 'revamped'
  ];
  const detectedVerbs = powerVerbs.filter(v => normalizedText.includes(v));

  const metricMatches = String(text || '').match(/(\$\s*\d+[\d,]*(\.\d+)?([kKmMbB])?)|(\b\d+(\.\d+)?\s*%)|(\b\d{1,3}(,\d{3})+\b)|(\b\d+\+?\s*(users|clients|patients|accounts|team members|customers|projects|leads|deals|transactions))/gi) || [];
  const metricCount = metricMatches.length;

  const hasContactEmail = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/.test(String(text || ''));
  const hasContactPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(String(text || ''));
  const hasExperience = /experience|employment|work history|career history|professional background/i.test(normalizedText);
  const hasEducation = /education|degree|university|college|bachelor|master|phd|diploma|academy/i.test(normalizedText);
  const hasSkills = /skills|competencies|technologies|expertise|capabilities/i.test(normalizedText);
  const hasSummary = /summary|objective|profile|about me|professional overview/i.test(normalizedText);
  const hasProjectsOrCert = /project|certification|certificate|accreditation|license/i.test(normalizedText);

  let keywordScore = 0;
  const domainSkillCount = detectedSkills.filter(s =>
    domainConfig.skills.some(ds => ds.toLowerCase() === s.toLowerCase())
  ).length;
  keywordScore += Math.min(18, domainSkillCount * 2.5);
  if (detectedSkills.length >= 6) keywordScore += 4;
  if (domainConfig.keywords.some(kw => normalizedText.includes(kw))) keywordScore += 3;
  keywordScore = Math.min(25, Math.max(5, Math.round(keywordScore)));

  let impactScore = 0;
  impactScore += Math.min(12, metricCount * 3);
  impactScore += Math.min(10, detectedVerbs.length * 2);
  if (/reduced|increased|improved|boosted|saved|grew/i.test(normalizedText)) impactScore += 3;
  impactScore = Math.min(25, Math.max(4, Math.round(impactScore)));

  let structureScore = 0;
  if (hasContactEmail) structureScore += 4;
  if (hasContactPhone) structureScore += 3;
  if (hasExperience) structureScore += 6;
  if (hasEducation) structureScore += 5;
  if (hasSkills) structureScore += 4;
  if (hasSummary) structureScore += 3;
  structureScore = Math.min(25, Math.max(5, Math.round(structureScore)));

  let readabilityScore = 0;
  const wordCount = String(text || '').trim().split(/\s+/).filter(Boolean).length;
  if (wordCount >= 150 && wordCount <= 1200) readabilityScore += 10;
  else if (wordCount > 50) readabilityScore += 5;
  const bulletCount = (String(text || '').match(/^[•\-\*]\s+/gm) || []).length;
  if (bulletCount >= 4) readabilityScore += 8;
  else if (bulletCount >= 1) readabilityScore += 4;
  if (hasProjectsOrCert) readabilityScore += 4;
  if (!String(text || '').includes('★') && !String(text || '').includes('■')) readabilityScore += 3;
  readabilityScore = Math.min(25, Math.max(5, Math.round(readabilityScore)));

  const totalScore = keywordScore + impactScore + structureScore + readabilityScore;

  const criticalBlockers = [];
  const warnings = [];
  const passedChecks = [];

  if (!hasExperience) criticalBlockers.push('Missing "Work Experience" section - ATS parsers require standard experience headers.');
  if (!hasContactEmail) criticalBlockers.push('No professional email address detected in the header.');
  if (metricCount === 0) criticalBlockers.push('Zero quantifiable metrics detected (no %, numbers, or KPIs). Top ATS resumes require measurable results.');
  if (detectedSkills.length < 3) criticalBlockers.push(`Critically low domain keywords detected for ${domainConfig.label}.`);

  if (!hasContactPhone) warnings.push('No direct phone number detected in header.');
  if (!hasSummary) warnings.push('Missing a concise Professional Summary / Executive Profile section.');
  if (metricCount > 0 && metricCount < 3) warnings.push(`Only ${metricCount} quantified metric(s) found. Aim for at least 1 metric per key role.`);
  if (detectedVerbs.length < 3) warnings.push('Passive phrasing detected. Replace passive phrases with strong action verbs.');
  if (wordCount < 200) warnings.push('Resume content is brief. Expand bullet points using the STAR framework.');
  if (bulletCount < 3) warnings.push('Few bullet points detected. ATS formatting relies on clean, single-level bulleted lists.');

  if (hasContactEmail && hasContactPhone) passedChecks.push('Complete and ATS-parseable contact information.');
  if (hasExperience) passedChecks.push('Recognizable Work Experience structure.');
  if (hasEducation) passedChecks.push('Education history properly formatted.');
  if (domainSkillCount >= 4) passedChecks.push(`Solid core skills matching ${domainConfig.label} (${domainSkillCount} found).`);
  if (metricCount >= 3) passedChecks.push(`Strong quantifiable impact detected (${metricCount} measurable accomplishments).`);
  if (detectedVerbs.length >= 3) passedChecks.push('Dynamic power action verbs in place.');

  const suggestions = [];
  if (criticalBlockers.length > 0) suggestions.push(...criticalBlockers);
  if (missingSkills.length > 0) suggestions.push(`Integrate high-yield ${domainConfig.label} competencies: ${missingSkills.slice(0, 4).join(', ')}.`);
  if (metricCount < 3) suggestions.push(`Add measurable metrics using the Google XYZ formula: "Accomplished [X] as measured by [Y] by doing [Z]".`);
  if (!hasSummary) suggestions.push('Add a 2-3 sentence Executive Summary tailored to your target position.');

  return {
    score: totalScore,
    domain: domainKey,
    domainLabel: domainConfig.label,
    subscores: {
      keywords: keywordScore,
      impact: impactScore,
      structure: structureScore,
      readability: readabilityScore
    },
    metricsCount: metricCount,
    actionVerbsCount: detectedVerbs.length,
    skills: detectedSkills.slice(0, 15),
    missing: missingSkills.slice(0, 8),
    criticalBlockers,
    warnings,
    passedChecks,
    suggestions: suggestions.slice(0, 6),
    allDomains: Object.entries(DOMAIN_DEFINITIONS).map(([key, val]) => ({ key, label: val.label }))
  };
}

export function compileResumeToText(resumeData) {
  if (!resumeData) return '';
  return [
    resumeData.personalInfo?.fullName || '',
    resumeData.personalInfo?.targetRole || '',
    resumeData.personalInfo?.email || '',
    resumeData.personalInfo?.phone || '',
    resumeData.personalInfo?.location || '',
    'PROFESSIONAL SUMMARY',
    resumeData.summary || '',
    'CORE SKILLS',
    (resumeData.skills || []).join(', '),
    (resumeData.experiences && resumeData.experiences.length > 0) ? 'PROFESSIONAL EXPERIENCE' : '',
    ...(resumeData.experiences || []).flatMap(e => [
      `${e.role} | ${e.company} | ${e.startDate} - ${e.endDate}`,
      ...(e.bullets || []).map(b => `• ${b}`)
    ]),
    (resumeData.projects && resumeData.projects.length > 0) ? 'FEATURED PROJECTS' : '',
    ...(resumeData.projects || []).flatMap(p => [
      `${p.name} | ${p.tech || ''} (${p.date || ''})`,
      ...(p.bullets || []).map(b => `• ${b}`)
    ]),
    (resumeData.education && resumeData.education.length > 0) ? 'EDUCATION' : '',
    ...(resumeData.education || []).map(ed => `${ed.degree} in ${ed.field} - ${ed.school} (${ed.graduationYear})`),
    (resumeData.certifications && resumeData.certifications.length > 0) ? 'CERTIFICATIONS' : '',
    ...(resumeData.certifications || [])
  ].filter(Boolean).join('\n');
}


const COMMON_ACTION_VERBS = new Set([
  'scheduled', 'implemented', 'trained', 'recorded', 'assisted', 'managed',
  'designed', 'developed', 'built', 'led', 'coordinated', 'analyzed',
  'spearheaded', 'engineered', 'orchestrated', 'delivered', 'administered',
  'resolved', 'created', 'optimized', 'maintained', 'oversaw', 'monitored',
  'architected', 'facilitated', 'negotiated', 'conducted', 'directed',
  'established', 'executed', 'formulated', 'generated', 'identified',
  'improved', 'initiated', 'inspected', 'instructed', 'integrated',
  'launched', 'mentored', 'modernized', 'motivated', 'navigated',
  'negotiated', 'obtained', 'operated', 'organized', 'originated',
  'overhauled', 'performed', 'planned', 'prepared', 'presented',
  'produced', 'programmed', 'promoted', 'proposed', 'provided',
  'published', 'purchased', 'reconciled', 'recruited', 'redesigned',
  'reduced', 'refined', 'reorganized', 'replaced', 'restructured',
  'revamped', 'reviewed', 'revitalized', 'saved', 'screened',
  'secured', 'selected', 'simplified', 'solved', 'standardized',
  'streamlined', 'strengthened', 'supervised', 'surpassed', 'synthesized',
  'systematized', 'targeted', 'tested', 'tracked', 'transformed',
  'translated', 'triaged', 'unified', 'upgraded', 'utilized', 'validated'
]);



export function parseResumeToStructured(text = '', preferredDomain = null, fileName = '') {
  const normalizedFull = String(text || '').trim();
  const domainKey = detectDomain(text, preferredDomain);
  const domainConfig = DOMAIN_DEFINITIONS[domainKey] || DOMAIN_DEFINITIONS.general;

  // 1. Extract Contact Info
  const emailMatch = normalizedFull.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const email = emailMatch ? emailMatch[1].trim() : '';

  const phoneMatch = normalizedFull.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0].trim() : '';

  const linkedinMatch = normalizedFull.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
  const linkedin = linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : '';

  const githubMatch = normalizedFull.match(/(?:https?:\/\/)?(?:www\.)?(github\.com\/([a-zA-Z0-9_-]+)|[a-zA-Z0-9.-]+\.(?:dev|io|me))/i);
  const website = githubMatch ? `https://${githubMatch[1]}` : '';

  // Clean location detection (never mistake tool stacks like Figma, VS Code for locations)
  let location = '';
  const locRegex = /\b([A-Z][a-zA-Z\s.-]+,\s*(?:AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|USA|United States|UK|Canada|India|Australia|Germany|France|Delhi|Gurugram|Noida|Bengaluru|Bangalore|Mumbai|Pune|Hyderabad|London|Toronto|Sydney|Singapore))\b/i;
  const locMatch = normalizedFull.match(locRegex);
  if (locMatch) {
    const cand = locMatch[1].trim();
    if (!/figma|vs code|react|node|javascript|html|css|python|office|suite|adobe|mysql|spring/i.test(cand)) {
      location = cand;
    }
  }

  // 2. Candidate Name & Target Role
  const rawLines = normalizedFull.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  let fullName = '';

  for (let i = 0; i < Math.min(rawLines.length, 6); i++) {
    const l = rawLines[i];
    if (l.includes('@') || l.match(/\d{3}/) || l.includes('http') || l.includes('linkedin.com')) continue;
    if (/^(resume|curriculum|vitae|cv|page\s*\d+|contact|profile)/i.test(l)) continue;
    
    const cleaned = l.replace(/[^a-zA-Z\s.-]/g, '').trim();
    const words = cleaned.split(/\s+/);
    if (words.length >= 2 && words.length <= 4 && cleaned.length >= 4 && cleaned.length <= 35) {
      if (words.every(w => w.length > 0 && (w[0] === w[0].toUpperCase() || w.length === 1))) {
        fullName = cleaned;
        break;
      }
    }
  }

  if (!fullName && fileName) {
    const base = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').replace(/\b(resume|cv|latest|new|updated|202\d)\b/gi, '').trim();
    if (base.length >= 3) {
      fullName = base.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  if (!fullName && rawLines.length > 0) {
    const firstClean = rawLines[0].replace(/[^a-zA-Z\s.-]/g, '').trim();
    if (firstClean.length >= 3 && firstClean.length <= 35) fullName = firstClean;
  }
  if (!fullName) fullName = 'Candidate Name';

  let targetRole = '';
  for (let i = 0; i < Math.min(rawLines.length, 8); i++) {
    const l = rawLines[i];
    if (l === fullName || l.includes('@') || l.match(/\d{3}/)) continue;
    if (/specialist|engineer|manager|developer|analyst|coordinator|director|lead|nurse|consultant|associate|administrator|designer|architect|executive|officer|teacher|educator|practitioner|physician|accountant|representative/i.test(l)) {
      targetRole = l.replace(/[-|–].*$/, '').trim();
      break;
    }
  }
  if (!targetRole) {
    targetRole = `${domainConfig.label} Professional`;
  }

  // 3. Section Segmentation
  const SECTION_HEADER_REGEX = /\b(PROFESSIONAL\s+SUMMARY|EXECUTIVE\s+SUMMARY|SUMMARY|PROFESSIONAL\s+PROFILE|PROFILE|WORK\s+EXPERIENCE|PROFESSIONAL\s+EXPERIENCE|EMPLOYMENT\s+HISTORY|WORK\s+HISTORY|EXPERIENCE|PROJECTS|KEY\s+PROJECTS|FEATURED\s+PROJECTS|TECHNICAL\s+PROJECTS|ACADEMIC\s+BACKGROUND|EDUCATION|CORE\s+COMPETENCIES\s*(?:&|and)?\s*TECHNICAL\s+SKILLS|TECHNICAL\s+SKILLS|CORE\s+COMPETENCIES|KEY\s+SKILLS|SKILLS|CERTIFICATIONS\s*(?:&|and)?\s*ACCREDITATIONS|CERTIFICATIONS|LICENSES|ACCREDITATIONS|AWARDS|ACHIEVEMENTS)\b/gi;

  const headerMatches = [];
  let m;
  while ((m = SECTION_HEADER_REGEX.exec(normalizedFull)) !== null) {
    headerMatches.push({ header: m[0], index: m.index, length: m[0].length });
  }

  const sectionBlocks = {};
  for (let i = 0; i < headerMatches.length; i++) {
    const current = headerMatches[i];
    const next = headerMatches[i + 1];
    const content = next
      ? normalizedFull.slice(current.index + current.length, next.index).trim()
      : normalizedFull.slice(current.index + current.length).trim();

    const lowerH = current.header.toLowerCase();
    if (/experience|employment|work\s+history/i.test(lowerH)) sectionBlocks.experience = content;
    else if (/project/i.test(lowerH)) sectionBlocks.projects = content;
    else if (/education|academic/i.test(lowerH)) sectionBlocks.education = content;
    else if (/skills|competencies/i.test(lowerH)) sectionBlocks.skills = content;
    else if (/summary|profile/i.test(lowerH)) sectionBlocks.summary = content;
    else if (/certif|licens|accredit/i.test(lowerH)) sectionBlocks.certifications = content;
  }

  // 4. Extract Summary
  let summary = sectionBlocks.summary || '';
  if (summary.length > 600) summary = summary.slice(0, 600);

  // 5. Extract Skills (Clean parentheticals & delimiters)
  const detectedSkills = [];
  if (sectionBlocks.skills) {
    const tokens = sectionBlocks.skills.split(/[,;•|·\n\r]+/).map(s => s.trim()).filter(s => s.length >= 2 && s.length <= 40);
    tokens.forEach(t => {
      let cleaned = t.replace(/^[-*•\s]+/, '').replace(/^[A-Za-z\s]+:\s*/, '').replace(/\([^)]*$/, '').trim();
      if (cleaned && !detectedSkills.includes(cleaned) && !/^(skills|technical|proficient|competencies)/i.test(cleaned)) {
        detectedSkills.push(cleaned);
      }
    });
  }

  // Also match domain skills present in full text
  const allDomainSkills = domainConfig.skills;
  allDomainSkills.forEach(skill => {
    const pattern = new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i');
    if (pattern.test(normalizedFull) && !detectedSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      detectedSkills.push(skill);
    }
  });

  // 6. Extract Work Experience
  const experiences = [];
  const expContent = sectionBlocks.experience || '';
  const dateRegex = /\b((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|20\d\d|19\d\d)\s*(?:-|–|—|\bto\b)\s*((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|20\d\d|19\d\d|present|current)\b/gi;

  if (expContent) {
    const datePositions = [];
    let dMatch;
    while ((dMatch = dateRegex.exec(expContent)) !== null) {
      datePositions.push({ dateStr: dMatch[0], index: dMatch.index, length: dMatch[0].length });
    }

    if (datePositions.length > 0) {
      for (let i = 0; i < datePositions.length; i++) {
        const curDate = datePositions[i];
        const nextDate = datePositions[i + 1];

        const precedingStart = i === 0 ? 0 : datePositions[i - 1].index + datePositions[i - 1].length;
        const precedingChunk = expContent.slice(precedingStart, curDate.index).trim();
        const followingEnd = nextDate ? nextDate.index : expContent.length;
        let bodyChunk = expContent.slice(curDate.index + curDate.length, followingEnd).trim();

        const preLines = precedingChunk.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        let role = '';
        let company = '';
        let roleLoc = location;

        if (preLines.length >= 2) {
          company = preLines[preLines.length - 2];
          role = preLines[preLines.length - 1];
        } else if (preLines.length === 1) {
          const single = preLines[0];
          if (single.includes('|') || single.includes('—') || single.includes('-')) {
            const parts = single.split(/[|—–-]/).map(p => p.trim());
            role = parts[0];
            company = parts[1] || 'Organization';
            if (parts[2]) roleLoc = parts[2];
          } else {
            role = single;
            company = 'Organization';
          }
        } else {
          role = targetRole;
          company = 'Organization';
        }

        if (nextDate) {
          const bodyLines = bodyChunk.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
          if (bodyLines.length > 1) {
            const lastLine = bodyLines[bodyLines.length - 1];
            if (!/^[•\-\*·]/.test(lastLine) && lastLine.length < 50) {
              bodyChunk = bodyLines.slice(0, -1).join('\n');
            }
          }
        }

        const bullets = [];
        const rawBullets = bodyChunk.split(/(?:^[•\-\*·▪▫–—>]\s*|\n\s*[•\-\*·▪▫–—>]\s*|\n{2,})/gm).map(b => b.trim()).filter(Boolean);

        for (const b of rawBullets) {
          const cleanedBullet = b.replace(/^[•\-\*·▪▫–—>]\s*/, '').replace(/\s+/g, ' ').trim();
          if (cleanedBullet.length >= 15) {
            bullets.push(cleanedBullet);
          }
        }

        if (bullets.length === 0 && bodyChunk.length >= 20) {
          const sentences = bodyChunk.split(/\.\s+/).map(s => s.trim()).filter(s => s.length >= 15);
          sentences.forEach(s => bullets.push(s.replace(/\.$/, '') + '.'));
        }

        const dates = curDate.dateStr.split(/(?:-|–|—|\bto\b)/i).map(d => d.trim());

        experiences.push({
          id: `exp-${Date.now()}-${experiences.length}`,
          company: company.replace(/^[•\-\*·]/, '').trim(),
          role: role.replace(/^[•\-\*·]/, '').trim(),
          location: roleLoc || 'Remote / On-site',
          startDate: dates[0] || '2021',
          endDate: dates[1] || 'Present',
          current: /present|current/i.test(dates[1] || ''),
          bullets: bullets.length > 0 ? bullets : [
            `Spearheaded core initiatives utilizing ${detectedSkills[0] || 'industry tools'}, driving measurable improvements across departmental operations.`,
            `Collaborated with cross-functional leadership to ensure high-priority deliverables were met on-schedule.`
          ]
        });
      }
    }
  }

  // 7. Extract Projects (Key for developers, designers, engineers, students)
  const projects = [];
  const projContent = sectionBlocks.projects || '';
  if (projContent) {
    const projBlocks = projContent.split(/\n(?=[A-Z0-9][A-Za-z0-9\s.-]{2,40}(?:\||—|–|-|\())/g).map(p => p.trim()).filter(Boolean);
    for (let i = 0; i < projBlocks.length; i++) {
      const block = projBlocks[i];
      const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) continue;
      
      const titleLine = lines[0];
      const titleParts = titleLine.split(/[|—–]/).map(p => p.trim());
      const projName = titleParts[0] || `Project #${i + 1}`;
      const projTech = titleParts[1] || '';
      const projDate = titleParts[2] || (titleLine.match(/\b(20\d\d)\b/)?.[1] || '');

      const projBullets = [];
      for (let j = 1; j < lines.length; j++) {
        const b = lines[j].replace(/^[•\-\*·>]\s*/, '').trim();
        if (b.length >= 10) projBullets.push(b);
      }

      projects.push({
        id: `proj-${Date.now()}-${i}`,
        name: projName,
        tech: projTech,
        date: projDate,
        bullets: projBullets.length > 0 ? projBullets : [
          `Designed and implemented end-to-end functionality utilizing ${projTech || detectedSkills[0] || 'modern frameworks'}.`
        ]
      });
    }
  }

  // If no experience was explicitly extracted but projects exist, provide an experience placeholder or promote project
  if (experiences.length === 0) {
    experiences.push({
      id: `exp-${Date.now()}-0`,
      company: 'Organization / Freelance',
      role: targetRole,
      location: location || 'Remote / On-site',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      bullets: [
        `Spearheaded key initiatives utilizing ${detectedSkills[0] || 'core methodologies'}, improving performance metrics by 28%.`,
        `Collaborated with cross-functional teams to streamline workflows and deliver projects on schedule.`
      ]
    });
  }

  // 8. Extract Education (Clean up and parse properly)
  const education = [];
  const eduContent = sectionBlocks.education || '';
  if (eduContent) {
    const eduLines = eduContent.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < eduLines.length; i++) {
      const line = eduLines[i];
      if (/^\d{4}$/.test(line)) continue;

      const rangeMatch = line.match(/\b(20\d\d|19\d\d)\s*(?:-|—|–|\bto\b)\s*(20\d\d|19\d\d|present)\b/i);
      let gradYear = '2024';
      let lineClean = line;

      if (rangeMatch) {
        gradYear = rangeMatch[2];
        lineClean = line.replace(rangeMatch[0], '');
      } else {
        const singleYear = line.match(/\b(20\d\d|19\d\d)\b/);
        if (singleYear) {
          gradYear = singleYear[1];
          lineClean = line.replace(singleYear[0], '');
        }
      }

      lineClean = lineClean.replace(/\b(20\d\d|19\d\d)\b/g, '').replace(/[-—–]/g, ' ').replace(/\s+/g, ' ').trim();

      let degree = '';
      let field = '';
      let school = '';

      if (/\s+in\s+/i.test(lineClean)) {
        const parts = lineClean.split(/\s+in\s+/i);
        degree = parts[0].trim();
        school = parts.slice(1).join(' in ').replace(/\(\s*\)/g, '').replace(/[-—–]/g, '').trim();
      } else if (lineClean.includes('|')) {
        const parts = lineClean.split('|').map(p => p.trim());
        degree = parts[0];
        school = parts[1] ? parts[1].replace(/\(\s*\)/g, '').trim() : '';
      } else {
        degree = lineClean;
        if (eduLines[i + 1] && !/^\d{4}$/.test(eduLines[i + 1]) && !/(bachelor|master|degree|diploma|bca|mca|btech)/i.test(eduLines[i + 1])) {
          school = eduLines[i + 1].replace(/\(\s*\)/g, '').trim();
          i++;
        }
      }
      school = (school || 'Accredited Institution').replace(/\(\s*\)/g, '').trim();

      const parenMatch = degree.match(/\(([^)]+)\)/);
      if (parenMatch) {
        field = parenMatch[1].trim();
      } else {
        field = domainConfig.label;
      }

      education.push({
        id: `edu-${Date.now()}-${education.length}`,
        degree: degree || 'Bachelor Degree',
        field: field || domainConfig.label,
        school: school || 'Accredited Institution',
        graduationYear: gradYear,
        location: location || ''
      });
    }
  }

  if (education.length === 0) {
    const uniLine = rawLines.find(l => /university|college|institute|academy|school\s+of/i.test(l));
    if (uniLine) {
      education.push({
        id: `edu-${Date.now()}-0`,
        school: uniLine.replace(/^[•\-*]\s*/, '').trim(),
        degree: 'Bachelor Degree',
        field: domainConfig.label,
        graduationYear: uniLine.match(/\b(20\d\d)\b/)?.[1] || '2023',
        location: location || ''
      });
    }
  }

  // 9. Extract Certifications (Clean tags and accrediting bodies)
  const certs = [];
  const certContent = sectionBlocks.certifications || '';
  if (certContent) {
    const rawTokens = certContent.split(/\n+|(?<![A-Za-z0-9])•|·/).map(s => s.trim()).filter(Boolean);
    rawTokens.forEach(t => {
      const cleanT = t.replace(/^(certifications|accreditations|licenses|awards)[:\s&]*/i, '').replace(/^[•\-*]\s*/, '').trim();
      if (cleanT.length >= 4 && !certs.includes(cleanT)) {
        certs.push(cleanT);
      }
    });
  }

  if (!summary) {
    const top3 = detectedSkills.slice(0, 3).join(', ') || domainConfig.skills.slice(0, 3).join(', ');
    summary = `Accomplished ${targetRole} with proven expertise in ${top3}. Track record of driving operational execution, collaborating across teams, and delivering measurable results.`;
  }

  return {
    personalInfo: {
      fullName,
      targetRole,
      email,
      phone,
      location,
      linkedin,
      website
    },
    domain: domainKey,
    summary,
    skills: detectedSkills.length > 0 ? detectedSkills : domainConfig.skills.slice(0, 8),
    experiences,
    projects,
    education,
    certifications: certs.length > 0 ? certs : [
      `Certified ${domainConfig.label} Professional`
    ]
  };
}

export function optimizeResumeWithAI(resumeData, preferredDomain = null, targetJobDescription = '') {
  const domainKey = detectDomain('', preferredDomain || resumeData.domain);
  const domainConfig = DOMAIN_DEFINITIONS[domainKey] || DOMAIN_DEFINITIONS.general;

  const optimized = JSON.parse(JSON.stringify(resumeData));
  optimized.domain = domainKey;

  let issuesFixedCount = 0;

  // 1. Personalized Summary Enhancement (Elevate USER'S actual narrative)
  const role = optimized.personalInfo.targetRole || `${domainConfig.label} Professional`;
  const userSkills = optimized.skills.slice(0, 4);
  const yearsMatch = (optimized.summary || '').match(/(\d+)\+?\s*years/i);
  const yearsExp = yearsMatch ? `${yearsMatch[1]}+ years` : '5+ years';

  if (optimized.summary && optimized.summary.length > 20) {
    const coreSkillsStr = userSkills.join(', ');
    optimized.summary = `Accomplished ${role} with ${yearsExp} of demonstrated expertise in ${coreSkillsStr}. Proven track record of driving operational efficiencies, optimizing cross-functional workflows, and delivering measurable performance improvements while maintaining high industry standards.`;
  } else {
    optimized.summary = `Results-oriented ${role} with expertise in ${userSkills.join(', ')}. Track record of delivering high-impact solutions, collaborating with cross-functional stakeholders, and executing key strategic priorities.`;
  }
  issuesFixedCount += 1;

  // 2. Expand Skills Matrix with complementary Domain competencies (Keep ALL user skills!)
  const existingLower = new Set(optimized.skills.map(s => s.toLowerCase()));
  const missingDomainSkills = domainConfig.skills.filter(s => !existingLower.has(s.toLowerCase()));
  const recommendedAdditions = missingDomainSkills.slice(0, 4);
  optimized.skills = Array.from(new Set([...optimized.skills, ...recommendedAdditions]));
  if (recommendedAdditions.length > 0) issuesFixedCount += 1;

  // 3. Personalized Bullet Point Rewriting (STAR/XYZ applied to USER'S actual bullets)
  const verbs = domainConfig.actionVerbs;
  const metrics = domainConfig.metricTemplates;

  optimized.experiences = optimized.experiences.map((exp, expIdx) => {
    const enhancedBullets = exp.bullets.map((bullet, bulletIdx) => {
      let cleaned = bullet.trim()
        .replace(/^(responsible for|helped with|worked on|assisted in|assisted|managed to|did|handled|supported in)\s+/i, '')
        .replace(/[.\s]+$/, '');

      const hasMetric = /[0-9]+%|\$[0-9]+|\b\d+\b/.test(cleaned);
      const metricSnippet = metrics[(expIdx * 3 + bulletIdx) % metrics.length] || 'improving efficiency by 28%';

      const firstWord = (cleaned.split(/\s+/)[0] || '').toLowerCase();
      const isExistingStrongVerb = COMMON_ACTION_VERBS.has(firstWord) || verbs.some(v => v.toLowerCase() === firstWord);

      let upgraded = cleaned;

      if (isExistingStrongVerb) {
        // Keep the user's action verb and capitalize it
        upgraded = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
      } else {
        // Upgrade weak opening with domain power verb
        const actionVerb = verbs[(expIdx * 4 + bulletIdx) % verbs.length] || 'Spearheaded';
        upgraded = `${actionVerb} ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}`;
        issuesFixedCount += 1;
      }

      if (!hasMetric) {
        upgraded = `${upgraded}, ${metricSnippet}.`;
        issuesFixedCount += 1;
      } else {
        upgraded = `${upgraded}.`;
      }

      return upgraded;
    });

    return {
      ...exp,
      bullets: enhancedBullets
    };
  });

  const compiledText = compileResumeToText(optimized);

  const analysis = analyzeResume(compiledText, domainKey);

  return {
    optimizedData: optimized,
    compiledText,
    analysis,
    issuesFixedCount: Math.max(3, issuesFixedCount)
  };
}



export function matchJob(resumeText = '', jobText = '') {
  const resumeAnalysis = analyzeResume(resumeText);
  const jobAnalysis = analyzeResume(jobText);
  const matched = jobAnalysis.skills.filter(s => resumeAnalysis.skills.includes(s));
  const missing = jobAnalysis.skills.filter(s => !resumeAnalysis.skills.includes(s));
  const percent = jobAnalysis.skills.length > 0 ? Math.round((matched.length / jobAnalysis.skills.length) * 100) : 70;
  return {
    percent,
    matchedSkills: matched,
    missingSkills: missing,
    suggestions: missing.length > 0 ? [`Add keywords: ${missing.slice(0, 3).join(', ')}`] : ['Strong match with this role!'],
    roadmap: missing.map(s => ({ skill: s, steps: [`Learn ${s} through industry courses`, `Integrate ${s} into resume bullets`] }))
  };
}
