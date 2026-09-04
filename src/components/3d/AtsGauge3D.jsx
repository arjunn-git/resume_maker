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
    if (s >= 85) return { stroke: '#10B981', glow: 'rgba(16, 185, 129, 0.55)', label: 'Exceptional ATS Match (Top 5%)', badgeBg: 'rgba(16, 185, 129, 0.15)' }
    if (s >= 70) return { stroke: '#38BDF8', glow: 'rgba(56, 189, 248, 0.55)', label: 'Strong ATS Match', badgeBg: 'rgba(56, 189, 248, 0.15)' }
    if (s >= 55) return { stroke: '#F59E0B', glow: 'rgba(245, 158, 11, 0.55)', label: 'Needs Optimization', badgeBg: 'rgba(245, 158, 11, 0.15)' }
    return { stroke: '#F43F5E', glow: 'rgba(244, 63, 94, 0.55)', label: 'High ATS Rejection Risk', badgeBg: 'rgba(244, 63, 94, 0.15)' }
  }

  const { stroke, glow, label, badgeBg } = getColor(displayScore)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  const delta = baselineScore !== null ? displayScore - baselineScore : null

  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-indigo-500/20 rounded-3xl shadow-2xl shadow-indigo-500/10 w-full overflow-hidden group">
      {/* Ambient Cyber Backlight */}
      <div 
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
        style={{ background: stroke }}
      />

      {delta !== null && (
        <div className="flex items-center gap-2 px-3.5 py-1 text-xs font-black rounded-full bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 mb-1 shadow-sm">
          <span className="text-slate-500 dark:text-slate-400 font-semibold">Baseline: {baselineScore}%</span>
          <span className="text-slate-400">➔</span>
          <span className={delta >= 0 ? 'text-emerald-500 font-extrabold flex items-center gap-1' : 'text-amber-500'}>
            {delta >= 0 ? `▲ +${delta}% Boost` : `${delta}%`}
          </span>
        </div>
      )}

      <div className="relative w-56 h-56 flex items-center justify-center my-2">
        {/* Dynamic Glowing Halo */}
        <div
          className="absolute inset-2 rounded-full blur-3xl transition-all duration-700 opacity-70 animate-pulse-glow"
          style={{ background: glow }}
        />

        {/* Outer subtle radar ring */}
        <div className="absolute inset-0 rounded-full border border-slate-200/50 dark:border-indigo-500/20 animate-spin-slow pointer-events-none" />

        <svg className="w-52 h-52 -rotate-90 transform drop-shadow-lg" viewBox="0 0 200 200">
          <defs>
            <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={stroke} floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="13"
            fill="transparent"
            className="text-slate-200/60 dark:text-slate-800/80"
          />

          {/* Foreground animated score meter */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke={stroke}
            strokeWidth="13"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            filter="url(#glow-effect)"
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), stroke 0.5s ease'
            }}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center select-none">
          <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white drop-shadow-md">
            {displayScore}
            <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">%</span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-400 mt-0.5">
            ATS Score
          </span>
        </div>
      </div>

      <div className="mt-1 text-center">
        <span
          className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-black rounded-full border transition-all duration-300 shadow-sm"
          style={{ color: stroke, backgroundColor: badgeBg, borderColor: `${stroke}40` }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: stroke }} />
          {label}
        </span>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Target Role: <strong className="text-slate-800 dark:text-slate-200 font-bold">{domainLabel}</strong>
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
