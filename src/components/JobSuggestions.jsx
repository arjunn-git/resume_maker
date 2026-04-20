import React, { useState, memo } from "react";

const JobSuggestions = ({ candidateSkills, jobs, resumeText='', domain='technical' }) => {
  const [showOnlyDomain, setShowOnlyDomain] = useState(false);

  // Build job portal URLs for Naukri and LinkedIn based on role and company
  const getNaukriUrl = (job) => `https://www.naukri.com/${encodeURIComponent(job.title + ' ' + job.company)}-jobs`;
  const getLinkedInUrl = (job) => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title + ' ' + job.company)}`;

  const filteredJobs = showOnlyDomain
    ? jobs.filter(job => job.domain === domain)
    : jobs

  const rankedJobs = filteredJobs
    .map(job => ({
      ...job,
      skillMatch: typeof job.skillMatch === 'number' ? job.skillMatch : 0,
      experienceMatch: typeof job.experienceMatch === 'number' ? job.experienceMatch : 0,
      keywordMatch: typeof job.keywordMatch === 'number' ? job.keywordMatch : 0,
      domainMatch: typeof job.domainMatch === 'number' ? job.domainMatch : 0,
      matchScore: typeof job.matchScore === 'number' ? job.matchScore : 0,
      reason: job.reason || 'General match'
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5); // Show top 5

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recommended Jobs ({domain.toUpperCase()})</h2>
        <button
          onClick={() => setShowOnlyDomain(prev => !prev)}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium"
        >
          {showOnlyDomain ? 'All Domains' : 'Only '+domain}
        </button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Showing roles aligned with your detected domain from resume.</p>
      {rankedJobs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No job suggestions available.</p>
      ) : (
        <ul className="space-y-4">
          {rankedJobs.map(job => (
            <li key={job.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{job.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{job.company} • {job.experience_level} level</div>
                  
                  {/* Match Score Progress Bar */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Match</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{job.matchScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          job.matchScore >= 80 ? 'bg-green-500' :
                          job.matchScore >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{width: `${job.matchScore}%`}}
                      />
                    </div>
                  </div>

                  {/* Detailed Matches */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                      Skills: {job.skillMatch}%
                    </span>
                    <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full text-xs">
                      Experience: {job.experienceMatch}%
                    </span>
                    <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded-full text-xs">
                      Keywords: {job.keywordMatch}%
                    </span>
                    <span className="inline-block bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 px-2 py-1 rounded-full text-xs">
                      Domain: {job.domainMatch}%
                    </span>
                  </div>

                  {/* Why this match */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Why this match?</strong> {job.reason}
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Required: {job.requiredSkills.join(", ")}
                  </div>
                </div>
                <div className="ml-4 flex flex-col items-end gap-2">
                    <a
                      href={getNaukriUrl(job)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold"
                    >
                      Naukri apply
                    </a>
                    <a
                      href={getLinkedInUrl(job)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-semibold"
                    >
                      LinkedIn apply
                    </a>
                  </div>
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(JobSuggestions);
