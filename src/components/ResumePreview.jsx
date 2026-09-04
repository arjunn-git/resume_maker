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

  // Isolated Print/PDF Download: Guarantees ONLY the resume document is downloaded, not the app UI
  const handleDownloadPDF = () => {
    const resumeEl = document.getElementById('ats-resume-document')
    if (!resumeEl) return

    // Create a hidden, isolated iframe
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.right = '0'
    iframe.style.bottom = '0'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = '0'
    iframe.style.visibility = 'hidden'
    document.body.appendChild(iframe)

    const doc = iframe.contentWindow.document
    const candidateName = personalInfo.fullName || 'Candidate'
    const cleanFileName = `${candidateName.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}_ATS_Resume`
    doc.title = cleanFileName

    // Extract styles from the parent page
    const headContent = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], style'))
      .map(el => el.outerHTML)
      .join('\n')

    doc.open()
    doc.write(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${cleanFileName}</title>
          ${headContent}
          <style>
            @page {
              size: letter portrait;
              margin: 10mm 12mm;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box !important;
            }
            html, body {
              background: #ffffff !important;
              color: #0f172a !important;
              margin: 0 !important;
              padding: 0 !important;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }
            #ats-resume-document {
              width: 100% !important;
              max-width: 100% !important;
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
              margin: 0 !important;
              transform: none !important;
              min-height: auto !important;
              background: #ffffff !important;
            }
            a {
              text-decoration: none !important;
              color: inherit !important;
            }
          </style>
        </head>
        <body>
          <div id="ats-resume-document" class="${template === 'executive' ? 'font-serif' : 'font-sans'} ${template === 'compact' ? 'space-y-4 text-xs' : 'space-y-6'}">
            ${resumeEl.innerHTML}
          </div>
        </body>
      </html>
    `)
    doc.close()

    // Trigger isolated print to save as PDF
    iframe.contentWindow.focus()
    setTimeout(() => {
      iframe.contentWindow.print()
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe)
        }
      }, 2000)
    }, 350)
  }

  // Direct Word (.doc) download with 100% ATS formatting
  const handleDownloadWord = () => {
    const resumeEl = document.getElementById('ats-resume-document')
    if (!resumeEl) return
    const candidateName = personalInfo.fullName || 'Candidate'
    const cleanFileName = `${candidateName.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}_ATS_Resume.doc`

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${cleanFileName}</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; font-size: 10.5pt; line-height: 1.35; color: #0f172a; margin: 1in; }
          h1 { font-size: 20pt; font-weight: bold; margin-bottom: 2pt; text-transform: uppercase; color: #0f172a; }
          h2 { font-size: 11pt; font-weight: bold; border-bottom: 1.5pt solid #334155; padding-bottom: 2pt; margin-top: 14pt; margin-bottom: 4pt; text-transform: uppercase; color: #1d4ed8; }
          p { margin: 2pt 0; }
          ul { margin: 3pt 0 6pt 18pt; padding: 0; }
          li { margin-bottom: 2.5pt; }
        </style>
      </head>
      <body>
        ${resumeEl.innerHTML}
      </body>
      </html>
    `
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = cleanFileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
        <div className="flex flex-wrap items-center gap-2">
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
            onClick={handleDownloadWord}
            title="Download formatted ATS Word Document (.doc)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Word (.doc)
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition transform hover:scale-[1.02] active:scale-95"
            title="Saves ONLY the clean resume document as a PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            Download ATS PDF
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
