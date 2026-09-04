import React from 'react'
import AtsGauge3D from './3d/AtsGauge3D'
import AtsAuditPanel from './AtsAuditPanel'

export default function Dashboard({ analysis, resumeData, baselineScore, onAutoFixAll, isOptimizing }) {
  if (!analysis) return null

  return (
    <div className="space-y-6">
      {/* Top 3D Score & Overview Card */}
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
          />
        </div>
      </div>
    </div>
  )
}
