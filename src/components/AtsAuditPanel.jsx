import React, { useState } from 'react'
import { AlertOctagon, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react'
import TiltCard3D from './3d/TiltCard3D'

export default function AtsAuditPanel({ analysis, onAutoFixAll, isOptimizing, compact = false }) {
  if (!analysis) return null

  const { criticalBlockers = [], warnings = [], passedChecks = [], score = 0 } = analysis
  const [filter, setFilter] = useState('all')

  return (
    <div className="space-y-4">
      <TiltCard3D maxTilt={5}>
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-black flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
              Automated AI ATS Optimizer
            </h3>
            <p className="text-xs text-blue-100 max-w-md leading-relaxed">
              Auto-rewrite bullets into high-impact STAR structure, inject quantified metrics, and target ATS keywords.
            </p>
          </div>

          <button
            onClick={onAutoFixAll}
            disabled={isOptimizing}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-indigo-700 hover:bg-yellow-300 hover:text-indigo-900 shadow-md transition-all duration-300 transform active:scale-95 disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isOptimizing ? 'Optimizing All Sections...' : 'Fix All Issues and Boost Score'}
          </button>
        </div>
      </TiltCard3D>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-2.5 py-1 rounded-lg font-medium transition ${filter === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
        >
          All ({criticalBlockers.length + warnings.length + passedChecks.length})
        </button>
        <button
          onClick={() => setFilter('blockers')}
          className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${filter === 'blockers' ? 'bg-red-500 text-white shadow-sm' : 'text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          Blockers ({criticalBlockers.length})
        </button>
        <button
          onClick={() => setFilter('warnings')}
          className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${filter === 'warnings' ? 'bg-amber-500 text-white shadow-sm' : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          Tips ({warnings.length})
        </button>
        <button
          onClick={() => setFilter('passed')}
          className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${filter === 'passed' ? 'bg-emerald-500 text-white shadow-sm' : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          Passed ({passedChecks.length})
        </button>
      </div>

      {/* Audit Panels with responsive stacking and shrink-0 tags to prevent collisions */}
      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
        {(filter === 'all' || filter === 'blockers') && (
          <div className="p-3.5 rounded-xl bg-red-50/70 dark:bg-red-950/20 border border-red-200/70 dark:border-red-900/40 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 flex items-center gap-1.5 min-w-0">
                <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Critical Blockers ({criticalBlockers.length})</span>
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 shrink-0">
                High Risk
              </span>
            </div>

            {criticalBlockers.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ Zero critical ATS blockers!</p>
            ) : (
              <ul className="space-y-1.5">
                {criticalBlockers.map((issue, idx) => (
                  <li key={idx} className="text-xs text-red-900 dark:text-red-300 flex items-start gap-1.5 leading-relaxed">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {(filter === 'all' || filter === 'warnings') && (
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5 min-w-0">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Recommendations ({warnings.length})</span>
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
                Moderate
              </span>
            </div>

            {warnings.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ All recommendations fulfilled!</p>
            ) : (
              <ul className="space-y-1.5">
                {warnings.map((warn, idx) => (
                  <li key={idx} className="text-xs text-amber-900 dark:text-amber-300 flex items-start gap-1.5 leading-relaxed">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {(filter === 'all' || filter === 'passed') && (
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 min-w-0">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Passed Checks ({passedChecks.length})</span>
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 shrink-0">
                Compliant
              </span>
            </div>

            <ul className="space-y-1.5">
              {passedChecks.map((chk, idx) => (
                <li key={idx} className="text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-1.5 leading-relaxed">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
