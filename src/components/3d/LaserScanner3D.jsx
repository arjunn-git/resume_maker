import React from 'react'

export default function LaserScanner3D({ active = false, label = 'Scanning Resume...' }) {
  if (!active) return null

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-2xl border-2 border-cyan-400/40 bg-cyan-500/5 backdrop-blur-[1px]">
      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-laser-sweep" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/60 shadow-lg shadow-cyan-500/20 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        {label}
      </div>
    </div>
  )
}
