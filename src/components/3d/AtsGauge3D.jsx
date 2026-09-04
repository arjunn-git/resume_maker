import React, { useEffect, useState } from 'react'

export default function AtsGauge3D({ score = 0, baselineScore = null, subscores = {}, domainLabel = 'Universal' }) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    let start = displayScore
    const end = Math.min(100, Math.max(0, score))
    if (start === end) return

    const duration = 750
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (end - start) * easeProgress)
      setDisplayScore(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [score])

  const getColor = (s) => {
    if (s >= 85) return { stroke: '#10B981', glow: 'rgba(16, 185, 129, 0.45)', label: 'Exceptional (Top 5%)' }
    if (s >= 70) return { stroke: '#3B82F6', glow: 'rgba(59, 130, 246, 0.45)', label: 'Strong ATS Match' }
    if (s >= 55) return { stroke: '#F59E0B', glow: 'rgba(245, 158, 11, 0.45)', label: 'Needs Optimization' }
    return { stroke: '#EF4444', glow: 'rgba(239, 68, 68, 0.45)', label: 'High ATS Rejection Risk' }
  }

  const { stroke, glow, label } = getColor(displayScore)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  const delta = baselineScore !== null ? displayScore - baselineScore : null

  return (
    <div className="relative flex flex-col items-center justify-center p-5 bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/50 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-indigo-950/50 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/60 rounded-3xl shadow-xl shadow-blue-500/5 w-full">
      {delta !== null && (
        <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-1">
          <span className="text-slate-500 dark:text-slate-400">Baseline: {baselineScore}%</span>
          <span className="text-slate-400">→</span>
          <span className={delta >= 0 ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-amber-500'}>
            {delta >= 0 ? `+${delta}%` : `${delta}%`} Boost
          </span>
        </div>
      )}

      <div className="relative w-52 h-52 flex items-center justify-center my-2">
        <div
          className="absolute inset-4 rounded-full blur-2xl transition-all duration-700 opacity-60"
          style={{ background: glow }}
        />

        <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="14"
            fill="transparent"
            className="text-slate-200/70 dark:text-slate-800/80"
          />

          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke={stroke}
            strokeWidth="14"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), stroke 0.5s ease'
            }}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
            {displayScore}
            <span className="text-2xl font-bold text-slate-400">%</span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            ATS Score
          </span>
        </div>
      </div>

      <div className="mt-1 text-center">
        <span
          className="inline-block px-3 py-1 text-xs font-bold rounded-full transition-colors duration-300"
          style={{ color: stroke, backgroundColor: `${stroke}18` }}
        >
          {label}
        </span>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
          Calibrated for <strong className="text-slate-700 dark:text-slate-300">{domainLabel}</strong>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 w-full mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
          <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Keywords</span>
            <span className="font-bold text-blue-500">{subscores.keywords || 0}/25</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((subscores.keywords || 0) / 25) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
          <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Impact & Metrics</span>
            <span className="font-bold text-emerald-500">{subscores.impact || 0}/25</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${((subscores.impact || 0) / 25) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
          <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Structure</span>
            <span className="font-bold text-purple-500">{subscores.structure || 0}/25</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${((subscores.structure || 0) / 25) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
          <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Readability</span>
            <span className="font-bold text-amber-500">{subscores.readability || 0}/25</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${((subscores.readability || 0) / 25) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
