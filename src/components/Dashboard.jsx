import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import JobSuggestions from './JobSuggestions'
import jobs from '../data/jobs.json'
import { suggestJobs } from '../utils/suggestJobs'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard({analysis, resumeText=''}){
  const [jobSuggestions, setJobSuggestions] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(false)

  useEffect(() => {
    if (analysis) {
      fetchJobSuggestions()
    }
  }, [analysis])

  const fetchJobSuggestions = async () => {
    setLoadingJobs(true)
    try {
      const response = await fetch('/api/suggest-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateSkills: analysis.skills,
          preferredDomain: analysis.domain,
          resumeText
        }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setJobSuggestions(result.data)
        }
      }
    } catch (error) {
      console.error('Failed to fetch job suggestions:', error)
      // Fallback to local
      setJobSuggestions(suggestJobs(analysis.skills, jobs, analysis.domain, resumeText))
    } finally {
      setLoadingJobs(false)
    }
  }
  
  // Color based on score
  const score = analysis?.score || 0
  const getScoreColor = (s) => {
    if (s >= 80) return '#10B981' // green
    if (s >= 60) return '#F59E0B' // amber
    return '#EF4444' // red
  }
  
  const data = {
    labels: ['ATS Score','Gap'],
    datasets: [{
      data: [score, 100-score],
      backgroundColor: [getScoreColor(score),'#E5E7EB']
    }]
  }

  return (
    <>
    <section className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow">
      <h2 className="text-xl font-semibold mb-4">ATS Score & Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="w-48 mx-auto">
            <Doughnut data={data} />
          </div>
          <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your resume scores <strong>{score}%</strong>
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2 text-green-600 dark:text-green-400">✓ Detected Skills ({analysis.skills.length})</p>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map(s=> (
                <span key={s} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2 text-red-600 dark:text-red-400">⊘ Missing Keywords (Sample)</p>
            <div className="flex flex-wrap gap-2">
              {analysis.missing.slice(0,5).map(k=> (
                <span key={k} className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    {loadingJobs ? (
      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg">
        Loading job suggestions...
      </div>
    ) : (
      <JobSuggestions 
        candidateSkills={analysis.skills} 
        jobs={jobSuggestions}
        resumeText={resumeText}
        domain={analysis.domain}
      />
    )}
    </>
  )
}
