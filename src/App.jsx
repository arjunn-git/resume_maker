import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Upload from './components/Upload'
import Dashboard from './components/Dashboard'
import Suggestions from './components/Suggestions'
import JobMatch from './components/JobMatch'
import { analyzeResume } from './utils/analysis'
import { apiPath } from './utils/api'

export default function App(){
  const [resume, setResume] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(resume){
      analyzeResumeAPI(resume.text || resume.name)
    }
  },[resume])

  const analyzeResumeAPI = async (text) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(apiPath('/api/analyze-resume'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze resume')
      }

      const result = await response.json()
      if (result.success) {
        setAnalysis(result.data)
        // Save to history
        const hist = JSON.parse(localStorage.getItem('rm_history')||'[]')
        hist.unshift({name: resume.name, at: Date.now(), score: result.data.score})
        localStorage.setItem('rm_history', JSON.stringify(hist.slice(0,20)))
      } else {
        throw new Error(result.message || 'Analysis failed')
      }
    } catch (err) {
      setError('Failed to analyze resume. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-5xl mx-auto px-6 pb-12 space-y-6">
        <Upload onUpload={setResume} />
        
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {loading && (
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg">
            Analyzing your resume...
          </div>
        )}
        
        {analysis && (
          <>
            <Dashboard analysis={analysis} resumeText={resume?.text || ''} />
            <Suggestions suggestions={analysis.suggestions} />
            <JobMatch resumeText={resume?.text} />
          </>
        )}
        
        {!resume && !analysis && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Upload a resume to get started →</p>
          </div>
        )}
      </div>
    </div>
  )
}
