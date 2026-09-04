import React, { useState } from 'react'
import { Printer, Download, Eye, Layers, Copy, Check, Palette, Sparkles, FolderGit2 } from 'lucide-react'

const COLOR_THEMES = {
  blue: { name: 'Royal Blue', primary: 'text-blue-700', bg: 'bg-blue-600', border: 'border-blue-600', badge: 'bg-blue-50 text-blue-800' },
  slate: { name: 'Charcoal Minimal', primary: 'text-slate-800', bg: 'bg-slate-800', border: 'border-slate-800', badge: 'bg-slate-100 text-slate-800' },
  indigo: { name: 'Deep Indigo', primary: 'text-indigo-700', bg: 'bg-indigo-600', border: 'border-indigo-600', badge: 'bg-indigo-50 text-indigo-800' },
  emerald: { name: 'Emerald Green', primary: 'text-emerald-700', bg: 'bg-emerald-600', border: 'border-emerald-600', badge: 'bg-emerald-50 text-emerald-800' },
  burgundy: { name: 'Crimson Executive', primary: 'text-rose-800', bg: 'bg-rose-700', border: 'border-rose-700', badge: 'bg-rose-50 text-rose-800' }
}

export default function ResumePreview({ resumeData }) {
  const [template, setTemplate] = useState('modern')
  const [colorTheme, setColorTheme] = useState('blue')
  const [view3D, setView3D] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!resumeData) return null

  const { personalInfo = {}, summary = '', skills = [], experiences = [], projects = [], education = [], certifications = [] } = resumeData
  const activeColor = COLOR_THEMES[colorTheme] || COLOR_THEMES.blue

  const handlePrint = () => {
    window.print()
  }

  const handleCopyText = () => {
    const text = [
      personalInfo.fullName,
      personalInfo.targetRole,
      `${personalInfo.email || ''} | ${personalInfo.phone || ''} | ${personalInfo.location || ''}`,
      personalInfo.linkedin || '',
      '\nPROFESSIONAL SUMMARY',
      summary,
      '\nCORE COMPETENCIES & TECHNICAL SKILLS',
      skills.join(' • '),
      experiences.length > 0 ? '\nPROFESSIONAL EXPERIENCE' : '',
      ...experiences.flatMap(e => [
        `${e.role} — ${e.company} (${e.startDate} - ${e.endDate})`,
        ...e.bullets.map(b => `• ${b}`)
      ]),
      projects.length > 0 ? '\nFEATURED PROJECTS' : '',
      ...projects.flatMap(p => [
        `${p.name} | ${p.tech || ''} (${p.date || ''})`,
        ...(p.bullets || []).map(b => `• ${b}`)
      ]),
      education.length > 0 ? '\nEDUCATION' : '',
      ...education.map(ed => `${ed.degree} in ${ed.field} — ${ed.school} (${ed.graduationYear})`),
      certifications.length > 0 ? '\nCERTIFICATIONS & ACCREDITATIONS' : '',
      ...certifications
    ].filter(Boolean).join('\n')

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm print:hidden">
        {/* Template Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setTemplate('modern')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${template === 'modern' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Modern ATS
          </button>
          <button
            onClick={() => setTemplate('executive')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${template === 'executive' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Classic Executive
          </button>
          <button
            onClick={() => setTemplate('minimal')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${template === 'minimal' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Clean Minimal
          </button>
          <button
            onClick={() => setTemplate('compact')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${template === 'compact' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
          >
            One-Page Compact
          </button>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl">
          {Object.entries(COLOR_THEMES).map(([k, col]) => (
            <button
              key={k}
              onClick={() => setColorTheme(k)}
              title={col.name}
              className={`w-5 h-5 rounded-full transition-transform ${col.bg} ${colorTheme === k ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'opacity-70 hover:opacity-100'}`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView3D(!view3D)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${view3D ? 'bg-indigo-50 border-indigo-300 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-700 dark:text-indigo-300' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}`}
          >
            <Layers className="w-3.5 h-3.5" />
            {view3D ? '3D View' : 'Flat Print View'}
          </button>

          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/20 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Download ATS PDF / Print
          </button>
        </div>
      </div>

      {/* Rendered Resume Document */}
      <div className={view3D ? 'perspective-[1200px] py-4' : ''}>
        <div
          id="ats-resume-document"
          className={`mx-auto max-w-[820px] bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-sm transition-all duration-300 print:shadow-none print:p-0 print:m-0 ${
            view3D ? 'rotate-x-[8deg] rotate-y-[-4deg] shadow-[0_30px_60px_rgba(0,0,0,0.18)] ring-1 ring-slate-900/5' : ''
          } ${template === 'executive' ? 'font-serif' : 'font-sans'} ${template === 'compact' ? 'space-y-4 text-xs' : 'space-y-6'}`}
          style={{ minHeight: '1050px' }}
        >
          {/* Header */}
          <div className={`${template === 'minimal' ? 'border-b border-slate-200 pb-3' : 'border-b-2 border-slate-900 pb-4'}`}>
            <h1 className={`text-3xl font-black uppercase tracking-tight text-slate-950 ${template === 'executive' ? 'tracking-wider text-2xl' : ''}`}>
              {personalInfo.fullName || 'Candidate Name'}
            </h1>
            <p className={`text-base font-bold uppercase tracking-wide mt-1 ${activeColor.primary}`}>
              {personalInfo.targetRole || 'Professional Title'}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && (
                <span>
                  • <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    {personalInfo.linkedin.replace('https://', '')}
                  </a>
                </span>
              )}
              {personalInfo.website && (
                <span>
                  • <a href={personalInfo.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    {personalInfo.website.replace('https://', '')}
                  </a>
                </span>
              )}
            </div>
          </div>

          {/* Professional Profile */}
          {summary && (
            <div>
              <h2 className={`text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2 ${activeColor.primary}`}>
                Professional Profile
              </h2>
              <p className="text-xs leading-relaxed text-slate-800 text-justify">
                {summary}
              </p>
            </div>
          )}

          {/* Skills Matrix */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className={`text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2 ${activeColor.primary}`}>
                Core Competencies & Technical Skills
              </h2>
              <p className="text-xs leading-relaxed text-slate-800">
                {skills.join(' • ')}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <div>
              <h2 className={`text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3 ${activeColor.primary}`}>
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-xs font-bold text-slate-950">
                        {exp.role} <span className="font-semibold text-slate-700">| {exp.company}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {exp.startDate} – {exp.endDate} {exp.location ? `(${exp.location})` : ''}
                      </span>
                    </div>

                    <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800 leading-relaxed">
                      {(exp.bullets || []).map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects (Essential for technical, design, creative, engineering roles) */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className={`text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3 ${activeColor.primary}`}>
                Featured Projects & Portfolio
              </h2>
              <div className="space-y-3">
                {projects.map((proj, pIdx) => (
                  <div key={pIdx} className="space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-xs font-bold text-slate-950">
                        {proj.name} {proj.tech ? <span className="font-medium text-slate-600">| {proj.tech}</span> : null}
                      </span>
                      {proj.date ? (
                        <span className="text-[11px] font-semibold text-slate-500">
                          {proj.date}
                        </span>
                      ) : null}
                    </div>

                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-800 leading-relaxed">
                      {(proj.bullets || []).map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2 className={`text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2 ${activeColor.primary}`}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-wrap items-baseline justify-between text-xs">
                    <span className="font-bold text-slate-950">
                      {edu.degree} in {edu.field} — <span className="font-normal text-slate-700">{edu.school}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {edu.graduationYear}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className={`text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2 ${activeColor.primary}`}>
                Certifications & Accreditations
              </h2>
              <p className="text-xs text-slate-800">
                {certifications.join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
