import React, { useState, useEffect } from 'react'

export default function Header(){
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'))
  
  useEffect(()=>{ 
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  },[dark])
  
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) setDark(saved === 'dark')
  }, [])

  return (
    <header className="sticky top-0 z-40 mb-6 py-3.5 border-b border-slate-200/80 dark:border-indigo-500/20 bg-white/75 dark:bg-slate-950/80 backdrop-blur-2xl transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Futuristic animated glowing logo */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
            <div className="relative w-11 h-11 rounded-2xl bg-slate-900 border border-white/20 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-indigo-500/30">
              <span className="bg-gradient-to-tr from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent transform group-hover:scale-110 transition duration-300">
                ✦
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                ATS<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">Studio</span> <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 border border-indigo-500/30 font-extrabold uppercase tracking-wider">3D</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Universal AI Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
              Dynamic multi-domain ATS optimizer, real-time recalculation & 3D resume builder
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live ATS Evaluator Ready
          </div>

          <button 
            onClick={() => setDark(!dark)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition shadow-sm hover:shadow-indigo-500/20 active:scale-95"
            aria-label="Toggle dark mode"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}
