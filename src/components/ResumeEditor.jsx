import React, { useState } from 'react'
import { Sparkles, Plus, Trash2, TrendingUp, Lightbulb, Briefcase, GraduationCap, Award, Wrench, User, FileText } from 'lucide-react'
import { DOMAIN_DEFINITIONS } from '../utils/analysis'

export default function ResumeEditor({ resumeData, onChange, onAutoOptimize, onScanRole, isOptimizing }) {
  const [activeTab, setActiveTab] = useState('experience')
  const [customSkill, setCustomSkill] = useState('')

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

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: 'Company Name',
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
      experiences: [newExp, ...resumeData.experiences]
    })
  }

  const updateExperience = (id, field, value) => {
    const updated = resumeData.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    onChange({ ...resumeData, experiences: updated })
  }

  const removeExperience = (id) => {
    onChange({
      ...resumeData,
      experiences: resumeData.experiences.filter(exp => exp.id !== id)
    })
  }

  const addBullet = (expId) => {
    const defaultVerb = domainConfig.actionVerbs[Math.floor(Math.random() * domainConfig.actionVerbs.length)] || 'Orchestrated'
    const defaultMetric = domainConfig.metricTemplates[Math.floor(Math.random() * domainConfig.metricTemplates.length)] || 'improving efficiency by 25%'
    const updated = resumeData.experiences.map(exp => {
      if (exp.id === expId) {
        return {
          ...exp,
          bullets: [...exp.bullets, `${defaultVerb} targeted initiatives aligning with organizational priorities, ${defaultMetric}.`]
        }
      }
      return exp
    })
    onChange({ ...resumeData, experiences: updated })
  }

  const updateBullet = (expId, bulletIdx, value) => {
    const updated = resumeData.experiences.map(exp => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets]
        newBullets[bulletIdx] = value
        return { ...exp, bullets: newBullets }
      }
      return exp
    })
    onChange({ ...resumeData, experiences: updated })
  }

  const removeBullet = (expId, bulletIdx) => {
    const updated = resumeData.experiences.map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIdx) }
      }
      return exp
    })
    onChange({ ...resumeData, experiences: updated })
  }

  const aiRewriteBullet = (expId, bulletIdx) => {
    const currentBullet = resumeData.experiences.find(e => e.id === expId)?.bullets[bulletIdx] || ''
    const verb = domainConfig.actionVerbs[Math.floor(Math.random() * domainConfig.actionVerbs.length)] || 'Spearheaded'
    const metric = domainConfig.metricTemplates[Math.floor(Math.random() * domainConfig.metricTemplates.length)] || 'reducing costs by 28%'
    const cleaned = currentBullet.replace(/^(responsible for|helped with|worked on|assisted in|did)\s+/i, '')
    const enhanced = `${verb} ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}, ${metric}.`
    updateBullet(expId, bulletIdx, enhanced)
  }

  const aiAddMetricToBullet = (expId, bulletIdx) => {
    const currentBullet = resumeData.experiences.find(e => e.id === expId)?.bullets[bulletIdx] || ''
    const metric = domainConfig.metricTemplates[Math.floor(Math.random() * domainConfig.metricTemplates.length)] || 'boosting performance metrics by 35%'
    const trimmed = currentBullet.replace(/[.\s]+$/, '')
    updateBullet(expId, bulletIdx, `${trimmed}, ${metric}.`)
  }

  const addSkill = (skillName) => {
    const trimmed = skillName.trim()
    if (!trimmed || resumeData.skills.includes(trimmed)) return
    onChange({
      ...resumeData,
      skills: [...resumeData.skills, trimmed]
    })
    setCustomSkill('')
  }

  const removeSkill = (skillToRemove) => {
    onChange({
      ...resumeData,
      skills: resumeData.skills.filter(s => s !== skillToRemove)
    })
  }

  const suggestDomainSkills = () => {
    const missing = domainConfig.skills.filter(s => !resumeData.skills.includes(s)).slice(0, 4)
    if (missing.length > 0) {
      onChange({
        ...resumeData,
        skills: Array.from(new Set([...resumeData.skills, ...missing]))
      })
    }
  }

  const aiEnhanceSummary = () => {
    const role = resumeData.personalInfo.targetRole || `${domainConfig.label} Specialist`
    const topSkills = resumeData.skills.slice(0, 4).join(', ') || domainConfig.skills.slice(0, 3).join(', ')
    const enhanced = `Accomplished ${role} with 5+ years of demonstrable success in ${topSkills}. Proven track record of leveraging industry best practices to accelerate operational outcomes, surpass organizational KPIs, and lead high-impact cross-functional initiatives. Recognized for analytical rigor and strategic execution.`
    updateField('summary', 'summary', enhanced)
  }

  const tabs = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Domain', icon: Wrench },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'contact', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap }
  ]

  return (
    <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/60 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[780px]">
      <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">⚡</span>
            Live Dynamic Resume Studio
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time ATS synchronization & inline AI assistance
          </p>
        </div>

        <button
          onClick={onAutoOptimize}
          disabled={isOptimizing}
          className="relative group px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          {isOptimizing ? 'Optimizing with AI...' : 'Auto-Fix ATS Issues (One-Click)'}
        </button>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800 px-3 bg-slate-50/70 dark:bg-slate-950/40 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-white dark:bg-slate-900/60'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Work Experience Roles</h3>
                <p className="text-xs text-slate-500">ATS algorithms look for quantifiable metrics and strong action verbs.</p>
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Position
              </button>
            </div>

            {resumeData.experiences.map((exp, expIdx) => (
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
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location || 'Remote'}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Accomplishment Bullet Points ({exp.bullets.length})
                    </span>
                    <button
                      onClick={() => addBullet(exp.id)}
                      className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>

                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="space-y-1 p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold mt-1 text-xs">•</span>
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                          className="flex-1 text-xs p-2 rounded border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/60 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                        />
                        <button
                          onClick={() => removeBullet(exp.id, bIdx)}
                          className="text-slate-400 hover:text-red-500 p-1 transition"
                          title="Delete bullet"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1 pl-4">
                        <button
                          onClick={() => aiRewriteBullet(exp.id, bIdx)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-100 transition"
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          AI Rewrite (STAR)
                        </button>
                        <button
                          onClick={() => aiAddMetricToBullet(exp.id, bIdx)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-100 transition"
                        >
                          <TrendingUp className="w-2.5 h-2.5" />
                          Add Metric
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Target Domain & Competencies</h3>
              <p className="text-xs text-slate-500">Universal calibration adapts to any industry or role.</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/60 space-y-3">
              <label className="block text-xs font-bold text-blue-900 dark:text-blue-300">
                Active Industry Domain
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
                  Skills Matrix ({resumeData.skills.length})
                </label>
                <button
                  onClick={suggestDomainSkills}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-100 transition"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Suggest High-Yield Skills
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a skill and hit Add (e.g. Python, GAAP, Patient Care)..."
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
                {resumeData.skills.map((skill) => (
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

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Contact & Header Information</h3>
              <p className="text-xs text-slate-500">Complete headers ensure ATS parser bots accurately index your profile.</p>
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
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">LinkedIn / Portfolio URL</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updateField('personalInfo', 'linkedin', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Education & Credentials</h3>

            {(resumeData.education || []).map((edu, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const updated = [...resumeData.education]
                        updated[idx].school = e.target.value
                        onChange({ ...resumeData, education: updated })
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Degree & Major</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...resumeData.education]
                        updated[idx].degree = e.target.value
                        onChange({ ...resumeData, education: updated })
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={edu.graduationYear}
                      onChange={(e) => {
                        const updated = [...resumeData.education]
                        updated[idx].graduationYear = e.target.value
                        onChange({ ...resumeData, education: updated })
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
