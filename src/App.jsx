import React, { useState, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import Header from './components/Header'
import Upload from './components/Upload'
import Dashboard from './components/Dashboard'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'
import JobMatch from './components/JobMatch'
import Background3D from './components/3d/Background3D'
import LaserScanner3D from './components/3d/LaserScanner3D'
import { analyzeResume, parseResumeToStructured, optimizeResumeWithAI, compileResumeToText } from './utils/analysis'
import { apiPath } from './utils/api'
import { initTheme } from './utils/theme'

export default function App() {
  useEffect(() => {
    initTheme()
  }, [])
  const [resumeData, setResumeData] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [baselineScore, setBaselineScore] = useState(null)
  const [activeView, setActiveView] = useState('studio') // 'studio' | 'preview' | 'audit' | 'jobmatch'
  const [isScanning, setIsScanning] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [scanMessage, setScanMessage] = useState('')

  // Celebrate with 3D Confetti when reaching 90%+
  const hasCelebrated = useRef(false)
  useEffect(() => {
    if (analysis && analysis.score >= 90 && !hasCelebrated.current) {
      hasCelebrated.current = true
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [analysis?.score])

  // Handle uploaded or dropped resume
  const handleUpload = (fileInfo) => {
    setIsScanning(true)
    setScanMessage('Laser Scanning & Parsing Resume...')

    setTimeout(() => {
      try {
        const text = fileInfo.text || ''
        const structured = parseResumeToStructured(text, null, fileInfo.name || '')
        const initialAnalysis = analyzeResume(text, structured.domain)

        setResumeData(structured)
        setAnalysis(initialAnalysis)
        setBaselineScore(initialAnalysis.score)
        hasCelebrated.current = false
      } catch (err) {
        console.error('Parse error:', err)
      } finally {
        setIsScanning(false)
      }
    }, 900)
  }

  // Handle 1-click sample resume selection
  const handleSelectSample = (sample) => {
    setIsScanning(true)
    setScanMessage(`Loading ${sample.label}...`)

    setTimeout(() => {
      const structured = parseResumeToStructured(sample.text, sample.domain, sample.label)
      const initialAnalysis = analyzeResume(sample.text, sample.domain)

      setResumeData(structured)
      setAnalysis(initialAnalysis)
      setBaselineScore(initialAnalysis.score)
      hasCelebrated.current = false
      setIsScanning(false)
    }, 700)
  }

  // Dynamic Live Re-Scoring on every keystroke/change in the editor
  const handleEditorChange = (newResumeData) => {
    setResumeData(newResumeData)
    const compiledText = compileResumeToText(newResumeData)
    const updatedAnalysis = analyzeResume(compiledText, newResumeData.domain)
    setAnalysis(updatedAnalysis)
  }

  // Domain change trigger
  const handleScanRole = (newDomain) => {
    if (!resumeData) return
    const compiledText = compileResumeToText(resumeData)
    const updatedAnalysis = analyzeResume(compiledText, newDomain)
    setAnalysis(updatedAnalysis)
  }

  // One-Click AI Automated Optimization
  const handleAutoOptimize = async () => {
    if (!resumeData) return
    setIsOptimizing(true)
    setIsScanning(true)
    setScanMessage('AI Rewriting Bullets (STAR Formula) & Injecting Keywords...')

    // Support both backend API call with instant client-side fallback
    try {
      const response = await fetch(apiPath('/api/optimize-resume'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData, preferredDomain: resumeData.domain })
      })

      if (response.ok) {
        const res = await response.json()
        if (res.success && res.data?.optimizedData) {
          setResumeData(res.data.optimizedData)
          setAnalysis(res.data.analysis)
          return
        }
      }
      throw new Error('Fallback to client optimizer')
    } catch (e) {
      // Client-side AI optimizer
      setTimeout(() => {
        const result = optimizeResumeWithAI(resumeData, resumeData.domain)
        setResumeData(result.optimizedData)
        setAnalysis(result.analysis)
      }, 800)
    } finally {
      setTimeout(() => {
        setIsOptimizing(false)
        setIsScanning(false)
      }, 1000)
    }
  }

  // 1-Click AI Tailor to Target Job
  const handleApplyTailoring = (missingSkills = []) => {
    if (!resumeData) return
    setIsScanning(true)
    setScanMessage('Tailoring Resume to Target Job Requirements...')

    setTimeout(() => {
      const updatedSkills = Array.from(new Set([...(resumeData.skills || []), ...missingSkills]))
      const updatedResume = { ...resumeData, skills: updatedSkills }
      const optResult = optimizeResumeWithAI(updatedResume, updatedResume.domain)
      setResumeData(optResult.optimizedData)
      setAnalysis(optResult.analysis)
      setIsScanning(false)
      setActiveView('studio')
    }, 700)
  }

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* 3D Ambient Constellation Canvas */}
      <Background3D />

      {/* Holographic Laser Scanner Overlay */}
      <LaserScanner3D active={isScanning} label={scanMessage} />

      {/* Header */}
      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-6 space-y-6">
        {/* Upload Zone / Domain Selector */}
        {!resumeData && (
          <div className="max-w-4xl mx-auto py-8">
            <Upload
              onUpload={handleUpload}
              onSelectSample={handleSelectSample}
              isScanning={isScanning}
            />
          </div>
        )}

        {/* Dynamic Studio Dashboard */}
        {resumeData && analysis && (
          <div className="space-y-6">
            {/* View Mode Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-indigo-500/20 shadow-xl shadow-indigo-500/5 print:hidden">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none touch-pan-x w-full sm:w-auto">
                <button
                  onClick={() => setActiveView('studio')}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap shrink-0 transition-all duration-200 ${
                    activeView === 'studio'
                      ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 text-white shadow-md shadow-indigo-500/30 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  ⚡ Live 3D Studio
                </button>
                <button
                  onClick={() => setActiveView('preview')}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap shrink-0 transition-all duration-200 ${
                    activeView === 'preview'
                      ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 text-white shadow-md shadow-indigo-500/30 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  📄 Document Preview
                </button>
                <button
                  onClick={() => setActiveView('audit')}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap shrink-0 transition-all duration-200 ${
                    activeView === 'audit'
                      ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 text-white shadow-md shadow-indigo-500/30 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  🔍 ATS Score ({analysis.score}%)
                </button>
                <button
                  onClick={() => setActiveView('jobmatch')}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap shrink-0 transition-all duration-200 ${
                    activeView === 'jobmatch'
                      ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 text-white shadow-md shadow-indigo-500/30 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  🎯 Job Tailor
                </button>
              </div>

              <button
                onClick={() => {
                  setResumeData(null)
                  setAnalysis(null)
                  setBaselineScore(null)
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition border border-transparent hover:border-rose-500/20"
              >
                Upload New Resume
              </button>
            </div>

            {/* TAB: STUDIO (Split-Pane Editor + Live Document Preview + Live Score) */}
            {activeView === 'studio' && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-7">
                  <ResumeEditor
                    resumeData={resumeData}
                    onChange={handleEditorChange}
                    onAutoOptimize={handleAutoOptimize}
                    onScanRole={handleScanRole}
                    isOptimizing={isOptimizing}
                  />
                </div>

                <div className="xl:col-span-5 space-y-6">
                  {/* Dashboard with 3D Gauge */}
                  <Dashboard
                    analysis={analysis}
                    resumeData={resumeData}
                    baselineScore={baselineScore}
                    onAutoFixAll={handleAutoOptimize}
                    isOptimizing={isOptimizing}
                    compact={true}
                  />

                  {/* Compact Live Document Preview */}
                  <ResumePreview resumeData={resumeData} />
                </div>
              </div>
            )}

            {/* TAB: ATS PREVIEW */}
            {activeView === 'preview' && (
              <div className="max-w-4xl mx-auto">
                <ResumePreview resumeData={resumeData} />
              </div>
            )}

            {/* TAB: DETAILED DIAGNOSTICS */}
            {activeView === 'audit' && (
              <div className="max-w-5xl mx-auto">
                <Dashboard
                  analysis={analysis}
                  resumeData={resumeData}
                  baselineScore={baselineScore}
                  onAutoFixAll={handleAutoOptimize}
                  isOptimizing={isOptimizing}
                />
              </div>
            )}

            {/* TAB: TARGET JOB MATCH */}
            {activeView === 'jobmatch' && (
              <div className="max-w-4xl mx-auto">
                <JobMatch
                  resumeText={compileResumeToText(resumeData)}
                  onApplyTailoring={handleApplyTailoring}
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
