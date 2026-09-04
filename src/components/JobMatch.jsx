import React, {useState, memo} from 'react'
import { apiPath } from '../utils/api'
import { analyzeResume } from '../utils/analysis'

export default memo(function JobMatch({ resumeText = '', onApplyTailoring }) {
  const [job, setJob] = useState('')
  const [result, setResult] = useState(null)

  const run = async ()=>{
    if (!job.trim()) {
      alert('Please paste a job description')
      return
    }
    setResult(null) // Clear previous result
    try {
      const response = await fetch(apiPath('/api/match-job'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText, jobText: job }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setResult(result.data)
        } else {
          alert(result.message || 'Matching failed')
        }
      } else {
        alert('Failed to match job description')
      }
    } catch (error) {
      console.warn('Backend job match error, computing client-side match:', error)
      const resumeAnalysis = analyzeResume(resumeText)
      const jobAnalysis = analyzeResume(job)
      const matched = jobAnalysis.skills.filter(s => resumeAnalysis.skills.includes(s))
      const missing = jobAnalysis.skills.filter(s => !resumeAnalysis.skills.includes(s))
      const percent = jobAnalysis.skills.length > 0 ? Math.round((matched.length / jobAnalysis.skills.length) * 100) : 70
      setResult({
        percent,
        matchedSkills: matched,
        missingSkills: missing,
        suggestions: missing.length > 0 ? [`Add keywords: ${missing.slice(0, 3).join(', ')}`] : ['Strong match with this role!'],
        roadmap: missing.map(s => ({ skill: s, steps: [`Learn ${s} through standard industry courses`, `Integrate ${s} into projects or resume bullets`] }))
      })
    }
  }

  return (
    <section className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-indigo-500/20 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl shadow-indigo-500/5 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Job Match Analysis</h3>
      <div className="space-y-4">
        <textarea 
          className="w-full p-4 text-xs rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition" 
          rows={6} 
          value={job} 
          onChange={e=>setJob(e.target.value)} 
          placeholder="Paste a job description here to see match percentage..."
        />
        <button 
          onClick={run} 
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition transform active:scale-95"
        >
          Analyze Match
        </button>
        
        {result && (
          <div className="mt-6 space-y-4 p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/40 border border-slate-200/90 dark:border-slate-800 shadow-inner">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Match Score</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      result.percent >= 80 ? 'bg-green-500' :
                      result.percent >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{width: `${result.percent}%`}}
                  />
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white w-12">{result.percent}%</span>
              </div>
            </div>
            
            {result.matchedSkills.length > 0 && (
              <div>
                <p className="text-green-600 dark:text-green-400 font-medium text-sm mb-2">✓ Matched Skills ({result.matchedSkills.length})</p>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {result.missingSkills.length > 0 && (
              <div>
                <p className="text-red-600 dark:text-red-400 font-medium text-sm mb-2">✗ Missing Skills ({result.missingSkills.length})</p>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.suggestions.length > 0 && (
              <div>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">💡 Suggestions</p>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.roadmap.length > 0 && (
              <div>
                <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-2">🛣️ Skill Gap Roadmap</p>
                <div className="space-y-3">
                  {result.roadmap.map((item, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{item.skill}</p>
                      <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                        {item.steps.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 1-Click AI Tailor to Target Job */}
            {onApplyTailoring && (
              <div className="pt-2">
                <button
                  onClick={() => onApplyTailoring(result.missingSkills || [])}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:opacity-95 shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-2"
                >
                  ⚡ One-Click Tailor Resume with Missing Job Keywords
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
})
