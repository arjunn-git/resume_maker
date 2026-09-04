import React from 'react'
import AtsGauge3D from './3d/AtsGauge3D'
import AtsAuditPanel from './AtsAuditPanel'

export default function Dashboard({ analysis, resumeData, baselineScore, onAutoFixAll, isOptimizing, compact = false }) {
  if (!analysis) return null

  if (compact) {
    return (
      <div className="space-y-5">
        <AtsGauge3D
          score={analysis.score}
          baselineScore={baselineScore}
          subscores={analysis.subscores}
          domainLabel={analysis.domainLabel}
        />
        <AtsAuditPanel
          analysis={analysis}
          onAutoFixAll={onAutoFixAll}
          isOptimizing={isOptimizing}
          compact={true}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <AtsGauge3D
            score={analysis.score}
            baselineScore={baselineScore}
            subscores={analysis.subscores}
            domainLabel={analysis.domainLabel}
          />
        </div>

        <div className="lg:col-span-2">
          <AtsAuditPanel
            analysis={analysis}
            onAutoFixAll={onAutoFixAll}
            isOptimizing={isOptimizing}
            compact={false}
          />
        </div>
      </div>
    </div>
  )
}
