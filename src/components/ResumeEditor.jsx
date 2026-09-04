import React, { useState } from 'react'
import { Sparkles, Plus, Trash2, TrendingUp, Lightbulb, Briefcase, GraduationCap, Award, Wrench, User, FileText, FolderGit2 } from 'lucide-react'
import { DOMAIN_DEFINITIONS } from '../utils/analysis'

export default function ResumeEditor({ resumeData, onChange, onAutoOptimize, onScanRole, isOptimizing }) {
  const [activeTab, setActiveTab] = useState('experience')
  const [customSkill, setCustomSkill] = useState('')
  const [customCert, setCustomCert] = useState('')

  if (!resumeData) return null

  const domainConfig = DOMAIN_DEFINITIONS[resumeData.domain] || DOMAIN_DEFINITIONS.general

  const updateField = (section, field, value) => {
    if (section === 'personalInfo') {
      onChange({
        ...resumeData,
        personalInfo: { ...resumeData.personalInfo, [field]: value }
      })
    } else {
      onChange({
        ...resumeData,
        [field]: value
      })
    }
  }

  // --- Experience Handlers ---
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: 'Enterprise Organization',
      role: `Senior ${resumeData.personalInfo.targetRole || 'Specialist'}`,
      location: 'Remote / On-site',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      bullets: [
        'Spearheaded key operational workflow improvements, accelerating departmental turnaround time by 32%.',
        'Collaborated with cross-functional leadership to implement standardized industry best practices.'
      ]
    }
    onChange({
      ...resumeData,
      experiences: [newExp, ...(resumeData.experiences || [])]
    })
  }

  const updateExperience = (id, field, value) => {
    const updated = (resumeData.experiences || []).map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    onChange({ ...resumeData, experiences: updated })
  }

  const removeExperience = (id) => {
    onChange({
      ...resumeData,
      experiences: (resumeData.experiences || []).filter(exp => exp.id !== id)
    })
  }

  const addBullet = (expId) => {
    const defaultVerb = domainConfig.actionVerbs[Math.floor(Math.random() * domainConfig.actionVerbs.length)] || 'Orchestrated'
    const defaultMetric = domainConfig.metricTemplates[Math.floor(Math.random() * domainConfig.metricTemplates.length)] || 'improving efficiency by 25%'
    const updated = (resumeData.experiences || []).map(exp => {
      if (exp.id === expId) {
        return {
          ...exp,
          bullets: [...(exp.bullets || []), `${defaultVerb} targeted initiatives aligning with organizational priorities, ${defaultMetric}.`]
        }
      }
      return exp
    })
    onChange({ ...resumeData, experiences: updated })
  }

  const updateBullet = (expId, bulletIdx, value) => {
    const updated = (resumeData.experiences || []).map(exp => {
      if (exp.id === expId) {
        const newBullets = [...(exp.bullets || [])]
        newBullets[bulletIdx] = value
        return { ...exp, bullets: newBullets }
      }
      return exp
    })
    onChange({ ...resumeData, experiences: updated })
  }

  const removeBullet = (expId, bulletIdx) => {
    const updated = (resumeData.experiences || []).map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: (exp.bullets || []).filter((_, i) => i !== bulletIdx) }
      }
      return exp
    })
    onChange({ ...resumeData, experiences: updated })
  }

  const aiRewriteBullet = (expId, bulletIdx) => {
    const currentBullet = (resumeData.experiences || []).find(e => e.id === expId)?.bullets?.[bulletIdx] || ''
    const verb = domainConfig.actionVerbs[Math.floor(Math.random() * domainConfig.actionVerbs.length)] || 'Spearheaded'
    const metric = domainConfig.metricTemplates[Math.floor(Math.random() * domainConfig.metricTemplates.length)] || 'reducing costs by 28%'
    const cleaned = currentBullet.replace(/^(responsible for|helped with|worked on|assisted in|did)\s+/i, '')
    const enhanced = `${verb} ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}, ${metric}.`
    updateBullet(expId, bulletIdx, enhanced)
  }

  const aiAddMetricToBullet = (expId, bulletIdx) => {
    const currentBullet = (resumeData.experiences || []).find(e => e.id === expId)?.bullets?.[bulletIdx] || ''
    const metric = domainConfig.metricTemplates[Math.floor(Math.random() * domainConfig.metricTemplates.length)] || 'boosting performance metrics by 35%'
    const trimmed = currentBullet.replace(/[.\s]+$/, '')
    updateBullet(expId, bulletIdx, `${trimmed}, ${metric}.`)
  }

  // --- Projects Handlers ---
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: 'Featured Web Application / Project',
      tech: 'React, Node.js, Tailwind CSS',
      link: '',
      date: '2024',
      bullets: [
        'Architected modern high-performance application featuring responsive design and real-time state synchronization.',
        'Integrated secure RESTful APIs to handle client-side data operations with sub-second response times.'
      ]
    }
    onChange({
      ...resumeData,
      projects: [...(resumeData.projects || []), newProj]
    })
  }

  const updateProject = (id, field, value) => {
    const updated = (resumeData.projects || []).map(proj => proj.id === id ? { ...proj, [field]: value } : proj)
    onChange({ ...resumeData, projects: updated })
  }

  const removeProject = (id) => {
    onChange({
      ...resumeData,
      projects: (resumeData.projects || []).filter(proj => proj.id !== id)
    })
  }

  const addProjectBullet = (projId) => {
    const updated = (resumeData.projects || []).map(proj => {
      if (proj.id === projId) {
        return {
          ...proj,
          bullets: [...(proj.bullets || []), 'Engineered responsive interface workflows, boosting user engagement by 35%.']
        }
      }
      return proj
    })
    onChange({ ...resumeData, projects: updated })
  }

  const updateProjectBullet = (projId, bIdx, val) => {
    const updated = (resumeData.projects || []).map(proj => {
      if (proj.id === projId) {
        const nb = [...(proj.bullets || [])]
        nb[bIdx] = val
        return { ...proj, bullets: nb }
      }
      return proj
    })
    onChange({ ...resumeData, projects: updated })
  }

  const removeProjectBullet = (projId, bIdx) => {
    const updated = (resumeData.projects || []).map(proj => {
      if (proj.id === projId) {
        return { ...proj, bullets: (proj.bullets || []).filter((_, i) => i !== bIdx) }
      }
      return proj
    })
    onChange({ ...resumeData, projects: updated })
  }

  // --- Skills Handlers ---
  const addSkill = (skillName) => {
    const trimmed = skillName.trim()
    if (!trimmed || (resumeData.skills || []).includes(trimmed)) return
    onChange({
      ...resumeData,
      skills: [...(resumeData.skills || []), trimmed]
    })
    setCustomSkill('')
  }

  const removeSkill = (skillToRemove) => {
    onChange({
      ...resumeData,
      skills: (resumeData.skills || []).filter(s => s !== skillToRemove)
    })
  }

  const suggestDomainSkills = () => {
    const missing = domainConfig.skills.filter(s => !(resumeData.skills || []).includes(s)).slice(0, 4)
    if (missing.length > 0) {
      onChange({
        ...resumeData,
        skills: Array.from(new Set([...(resumeData.skills || []), ...missing]))
      })
    }
  }

  const aiEnhanceSummary = () => {
    const role = resumeData.personalInfo.targetRole || `${domainConfig.label} Specialist`
    const topSkills = (resumeData.skills || []).slice(0, 4).join(', ') || domainConfig.skills.slice(0, 3).join(', ')
    const enhanced = `Accomplished ${role} with demonstrable track record in ${topSkills}. Proven success leveraging modern best practices to accelerate operational outcomes, surpass organizational KPIs, and lead high-impact cross-functional initiatives. Recognized for analytical rigor, rapid adaptation, and consistent execution.`
    updateField('summary', 'summary', enhanced)
  }

  // --- Certifications Handlers ---
  const addCertification = (certStr) => {
    const trimmed = certStr.trim()
    if (!trimmed || (resumeData.certifications || []).includes(trimmed)) return
    onChange({
      ...resumeData,
      certifications: [...(resumeData.certifications || []), trimmed]
    })
    setCustomCert('')
  }

  const removeCertification = (certStr) => {
    onChange({
      ...resumeData,
      certifications: (resumeData.certifications || []).filter(c => c !== certStr)
    })
  }

  // --- Education Handlers ---
  const addEducation = () => {
    const newEdu = {
      degree: 'Degree or Diploma Name',
      school: 'College or University Name',
      field: 'Field of Study / Major',
      graduationYear: `${new Date().getFullYear()}`
    }
    onChange({
      ...resumeData,
      education: [...(resumeData.education || []), newEdu]
    })
  }

  const removeEducation = (index) => {
    const updated = (resumeData.education || []).filter((_, i) => i !== index)
    onChange({
      ...resumeData,
      education: updated
    })
  }

  const tabs = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Domain', icon: Wrench },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'contact', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ]

  return (
    <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/60 rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[580px] md:h-[780px]">
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">⚡</span>
            Live Dynamic Resume Studio
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            Real-time ATS synchronization & inline AI assistance
          </p>
        </div>

        <button
          onClick={onAutoOptimize}
          disabled={isOptimizing}
          className="relative group px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center gap-1.5 sm:gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          {isOptimizing ? 'Optimizing with AI...' : 'Auto-Fix ATS Issues (One-Click)'}
        </button>
      </div>

      {/* Tabs bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 px-2 sm:px-3 bg-slate-50/70 dark:bg-slate-950/40 overflow-x-auto scrollbar-none touch-pan-x">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2.5 sm:py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-slate-900/60'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 sm:space-y-6 touch-pan-y">
        {/* TAB 1: WORK EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Work Experience Roles</h3>
                <p className="text-xs text-slate-500">Target action power verbs and quantifiable impact metrics.</p>
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Position
              </button>
            </div>

            {(resumeData.experiences || []).map((exp, expIdx) => (
              <div
                key={exp.id || expIdx}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Role #{expIdx + 1}
                  </span>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="p-1 rounded text-slate-400 hover:text-red-500 transition"
                    title="Remove position"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="e.g. 2021 or Jan 2021"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="e.g. Present or 2023"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Bullet Points</span>
                    <button
                      onClick={() => addBullet(exp.id)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>

                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 group">
                      <span className="text-xs text-slate-400 mt-2">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                        className="flex-1 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                      />
                      <div className="flex flex-col gap-1 shrink-0 pt-1">
                        <button
                          onClick={() => aiRewriteBullet(exp.id, bIdx)}
                          title="AI STAR Rewrite"
                          className="p-1 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 hover:bg-indigo-100 transition"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => aiAddMetricToBullet(exp.id, bIdx)}
                          title="Add Metric / KPI"
                          className="p-1 rounded bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300 hover:bg-amber-100 transition"
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeBullet(exp.id, bIdx)}
                          title="Delete Bullet"
                          className="p-1 rounded text-slate-300 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PROJECTS & PORTFOLIO */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Featured Projects & Portfolio</h3>
                <p className="text-xs text-slate-500">Critical for tech, creative, engineering, and student profiles.</p>
              </div>
              <button
                onClick={addProject}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            {(!resumeData.projects || resumeData.projects.length === 0) ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2">
                <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">No projects added yet.</p>
                <button
                  onClick={addProject}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-500 transition"
                >
                  + Add First Project
                </button>
              </div>
            ) : (
              (resumeData.projects || []).map((proj, pIdx) => (
                <div key={proj.id || pIdx} className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Project #{pIdx + 1}
                    </span>
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Date / Year</label>
                      <input
                        type="text"
                        value={proj.date}
                        onChange={(e) => updateProject(proj.id, 'date', e.target.value)}
                        placeholder="e.g. 2024"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Technologies / Tools Used</label>
                      <input
                        type="text"
                        value={proj.tech || ''}
                        onChange={(e) => updateProject(proj.id, 'tech', e.target.value)}
                        placeholder="e.g. React.js, Tailwind CSS, REST APIs"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center justify-between">
                        <span>Project Link / Demo / GitHub URL (Optional)</span>
                        <span className="text-[10px] text-indigo-500 font-bold">Clickable in PDF</span>
                      </label>
                      <input
                        type="text"
                        value={proj.link || ''}
                        onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                        placeholder="e.g. github.com/user/currency-converter or myproject.vercel.app"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Project Accomplishments</span>
                      <button
                        onClick={() => addProjectBullet(proj.id)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        <Plus className="w-3 h-3" /> Add Detail
                      </button>
                    </div>

                    {(proj.bullets || []).map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <span className="text-xs text-slate-400 mt-2">•</span>
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => updateProjectBullet(proj.id, bIdx, e.target.value)}
                          className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                        <button
                          onClick={() => removeProjectBullet(proj.id, bIdx)}
                          className="p-1.5 rounded text-slate-300 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: SKILLS & DOMAIN */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Target Domain & Profession
              </label>
              <select
                value={resumeData.domain || 'technical'}
                onChange={(e) => {
                  const newDomain = e.target.value
                  onChange({ ...resumeData, domain: newDomain })
                  onScanRole(newDomain)
                }}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
              >
                {Object.entries(DOMAIN_DEFINITIONS).map(([key, def]) => (
                  <option key={key} value={key}>{def.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Skills Matrix ({(resumeData.skills || []).length})
                </label>
                <button
                  onClick={suggestDomainSkills}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 hover:bg-indigo-100 transition"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Suggest Domain Competencies
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a skill and hit Add (e.g. Next.js, Figma, HIPAA, Financial Modeling)..."
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(customSkill))}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => addSkill(customSkill)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {(resumeData.skills || []).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 group hover:border-blue-400 transition"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Professional Summary</h3>
                <p className="text-xs text-slate-500">Concise 2-4 sentence executive overview targeted for ATS parsers.</p>
              </div>
              <button
                onClick={aiEnhanceSummary}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-sm transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Enhance Summary
              </button>
            </div>

            <textarea
              rows={6}
              value={resumeData.summary}
              onChange={(e) => updateField('summary', 'summary', e.target.value)}
              placeholder="Enter your professional overview or click AI Enhance Summary..."
              className="w-full text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        )}

        {/* TAB 5: PERSONAL INFO */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Contact & Header Information</h3>
              <p className="text-xs text-slate-500">Clear headers ensure ATS parser bots accurately index your profile.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updateField('personalInfo', 'fullName', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Professional Title</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.targetRole}
                  onChange={(e) => updateField('personalInfo', 'targetRole', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updateField('personalInfo', 'email', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updateField('personalInfo', 'phone', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Location (City, State / Country)</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updateField('personalInfo', 'location', e.target.value)}
                  placeholder="e.g. Gurugram, India or San Francisco, CA"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updateField('personalInfo', 'linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Education & Credentials</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add degrees, colleges, universities, GPA/scores, or diplomas.</p>
              </div>
              <button
                onClick={addEducation}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Education
              </button>
            </div>

            {(resumeData.education || []).length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <GraduationCap className="w-8 h-8 mx-auto text-slate-400 mb-2 opacity-60" />
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">No education entries added yet.</p>
                <button
                  onClick={addEducation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Education Entry
                </button>
              </div>
            ) : (
              (resumeData.education || []).map((edu, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900/50 shadow-sm relative group">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Education #{idx + 1}
                    </span>
                    <button
                      onClick={() => removeEducation(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                      title="Remove education"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.school || ''}
                        onChange={(e) => {
                          const updated = [...resumeData.education]
                          updated[idx] = { ...updated[idx], school: e.target.value }
                          onChange({ ...resumeData, education: updated })
                        }}
                        placeholder="e.g. St Andrews Inst. of Tech & Mgmt"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Degree & Major</label>
                      <input
                        type="text"
                        value={edu.degree || ''}
                        onChange={(e) => {
                          const updated = [...resumeData.education]
                          updated[idx] = { ...updated[idx], degree: e.target.value }
                          onChange({ ...resumeData, education: updated })
                        }}
                        placeholder="e.g. Bachelor of Computer Applications (BCA)"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Graduation Year / Status</label>
                      <input
                        type="text"
                        value={edu.graduationYear || ''}
                        onChange={(e) => {
                          const updated = [...resumeData.education]
                          updated[idx] = { ...updated[idx], graduationYear: e.target.value }
                          onChange({ ...resumeData, education: updated })
                        }}
                        placeholder="e.g. 2025"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Grade / CGPA / Field (Optional)</label>
                      <input
                        type="text"
                        value={edu.field || ''}
                        onChange={(e) => {
                          const updated = [...resumeData.education]
                          updated[idx] = { ...updated[idx], field: e.target.value }
                          onChange({ ...resumeData, education: updated })
                        }}
                        placeholder="e.g. CGPA: 7.5 or Computer Science"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 7: CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Certifications & Accreditations</h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. AWS Certified Solutions Architect, Meta Certified Front-End Developer..."
                value={customCert}
                onChange={(e) => setCustomCert(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification(customCert))}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
              <button
                onClick={() => addCertification(customCert)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition"
              >
                Add Certification
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {(resumeData.certifications || []).map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    {cert}
                  </span>
                  <button
                    onClick={() => removeCertification(cert)}
                    className="text-slate-400 hover:text-red-500 transition text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
