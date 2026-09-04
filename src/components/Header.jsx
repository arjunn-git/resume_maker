import React, { useState, useEffect } from 'react'
import { Sparkles, ShieldCheck, Sun, Moon, Zap, Layers } from 'lucide-react'
import { getTheme, toggleTheme } from '../utils/theme'

export default function Header() {
  const [theme, setThemeState] = useState(() => getTheme())
  const isDark = theme === 'dark'

  useEffect(() => {
    const onThemeChange = (e) => {
      setThemeState(e.detail?.theme || getTheme())
    }
    window.addEventListener('themechange', onThemeChange)
    return () => window.removeEventListener('themechange', onThemeChange)
  }, [])

  const handleToggle = () => {
    const next = toggleTheme()
    setThemeState(next)
  }

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-slate-900/85 backdrop-blur-2xl shadow-xl shadow-indigo-500/5 dark:shadow-black/40 px-4 sm:px-5 py-3 flex items-center justify-between transition-all">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20">
              <Layers className="w-5 h-5 text-white" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  ATS<span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">Studio</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                  3D AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block -mt-0.5">
                Universal ATS Optimizer & Dynamic Builder
              </p>
            </div>
          </div>

          {/* Center: Interactive Feature Highlights (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/50 border border-slate-200/80 dark:border-white/5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>STAR AI Bullet Engine</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/50 border border-slate-200/80 dark:border-white/5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>8-Domain Universal Scoring</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/50 border border-slate-200/80 dark:border-white/5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Real-Time Recalculation</span>
            </div>
          </div>

          {/* Right: Status, GitHub & Theme Switcher */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Engine Ready</span>
            </div>

            <a
              href="https://github.com/arjunn-git/resume_maker"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white transition shadow-sm flex items-center justify-center group"
              title="View on GitHub"
            >
              <svg className="w-4 h-4 fill-current group-hover:scale-110 transition" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            <button
              onClick={handleToggle}
              className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-700 transition shadow-sm flex items-center justify-center active:scale-90"
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}
