// Suggest jobs based on candidate skills, domain, and resume text
export function suggestJobs(candidateSkills, jobs, preferredDomain='technical', resumeText='') {
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
}
