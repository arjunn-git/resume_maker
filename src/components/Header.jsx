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
    <header className="mb-8 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Resume Analyzer</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Optimize your resume for ATS and job opportunities</p>
        </div>
        <button 
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
