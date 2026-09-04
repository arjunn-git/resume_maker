import React from 'react'
import { AlertOctagon, AlertTriangle, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react'
import TiltCard3D from './3d/TiltCard3D'

export default function AtsAuditPanel({ analysis, onAutoFixAll, isOptimizing }) {
  if (!analysis) return null

  const { criticalBlockers = [], warnings = [], passedChecks = [], score = 0 } = analysis

  return (
    <div className="space-y-4">
      <TiltCard3D maxTilt={6}>
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-black flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Automated AI ATS Optimizer
            </h3>
            <p className="text-xs text-blue-100 max-w-md">
              Automatically rewrites passive bullet points into the STAR format, injects quantifiable impact metrics, and fills missing domain keywords.
            </p>
          </div>

          <button
            onClick={onAutoFixAll}
            disabled={isOptimizing}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-indigo-700 hover:bg-yellow-300 hover:text-indigo-900 shadow-md transition-all duration-300 transform active:scale-95 disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isOptimizing ? 'Optimizing All Sections...' : '⚡ Fix All Issues & Boost Score'}
          </button>
        </div>
      </TiltCard3D>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" />
              Critical Blockers ({criticalBlockers.length})
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300">
              High Risk
            </span>
          </div>

          {criticalBlockers.length === 0 ? (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ No critical ATS blockers found!</p>
          ) : (
            <ul className="space-y-2">
              {criticalBlockers.map((issue, idx) => (
                <li key={idx} className="text-xs text-red-800 dark:text-red-300 flex items-start gap-1.5 leading-relaxed">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Recommendations ({warnings.length})
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
              Moderate
            </span>
          </div>

          {warnings.length === 0 ? (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ All optimization recommendations fulfilled!</p>
          ) : (
            <ul className="space-y-2">
              {warnings.map((warn, idx) => (
                <li key={idx} className="text-xs text-amber-800 dark:text-amber-300 flex items-start gap-1.5 leading-relaxed">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Passed Checks ({passedChecks.length})
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
              Compliant
            </span>
          </div>

          <ul className="space-y-2">
            {passedChecks.map((chk, idx) => (
              <li key={idx} className="text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-1.5 leading-relaxed">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>{chk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
