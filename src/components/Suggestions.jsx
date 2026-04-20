import React from 'react'

export default function Suggestions({suggestions=[]}){
  if (suggestions.length === 0) return null
  
  return (
    <section className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-yellow-500">💡</span> Improvement Suggestions
      </h3>
      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
            <span className="flex-shrink-0 text-blue-500 font-bold">•</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
