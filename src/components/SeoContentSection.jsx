import React, { useState } from 'react'
import { 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  Layers, 
  Target, 
  Zap, 
  FileCheck2, 
  Lock, 
  Cpu, 
  TrendingUp, 
  HelpCircle,
  Award,
  CheckCircle2
} from 'lucide-react'
import TiltCard3D from './3d/TiltCard3D'

const FAQS = [
  {
    q: 'What is an ATS (Applicant Tracking System) and why do 75% of resumes get rejected?',
    a: 'An Applicant Tracking System (ATS) is automated enterprise software (like Workday, Taleo, Greenhouse, and Lever) used by 99% of Fortune 500 companies to scan, parse, and rank resumes before a human recruiter ever sees them. Resumes are typically filtered out due to non-standard headers, missing industry keywords, low quantifiable metrics, unreadable multi-column formatting, or complex tables. ATS Studio guarantees 100% parseable formatting and targets high-yield competencies.'
  },
  {
    q: 'How does the STAR / Google XYZ bullet point formula improve interview callbacks?',
    a: 'Recruiters and hiring managers look for evidence of impact rather than passive duty lists. The Google XYZ formula—"Accomplished [X], as measured by [Y], by doing [Z]"—and the STAR method (Situation, Task, Action, Result) structure your bullets so that every claim contains a strong action verb, contextual scope, and verifiable percentage, dollar, or efficiency metric. ATS Studio\'s AI bullet engine automatically structures your bullets into this format.'
  },
  {
    q: 'Which resume format is safest for ATS scanning: PDF or Word (.doc)?',
    a: 'Both PDF and Word are supported by modern ATS systems, provided the text is clean and selectable. ATS Studio provides direct client-side export to both ATS-Compliant PDF and structured Word (.doc) without watermarks, non-standard layout blocks, or proprietary tags, ensuring seamless parsing across all major tracking platforms.'
  },
  {
    q: 'How does the 1-Click Job Match & Tailoring feature work?',
    a: 'Every job posting contains specific hard and soft skill requirements prioritized by the employer\'s screening filters. With Job Tailor, simply paste any job description: our algorithm instantly extracts missing keywords, calculates your match percentage, and provides a 1-click option to seamlessly integrate the target competencies into your resume.'
  },
  {
    q: 'Is my personal information and resume data safe and private?',
    a: 'Yes, 100%. ATS Studio performs resume parsing, STAR optimization, keyword calculation, and PDF generation directly inside your local browser using client-side JavaScript and Mozilla PDF.js. Your resume text is never sold, shared, or stored on third-party tracking databases.'
  }
]

const DOMAINS_LIST = [
  { name: 'Software Engineering', tag: 'React, Node, AWS, System Design, CI/CD' },
  { name: 'Healthcare & Nursing', tag: 'Patient Care, EHR/EMR, Triage, HIPAA' },
  { name: 'Finance & Accounting', tag: 'Financial Modeling, GAAP, Forecasting, P&L' },
  { name: 'B2B Sales & Accounts', tag: 'Quota Attainment, Salesforce, Pipeline, ARR' },
  { name: 'Growth Marketing', tag: 'CAC/LTV, SEO, Funnel Optimization, Ads' },
  { name: 'Product Management', tag: 'Product Discovery, Roadmaps, Agile, OKRs' },
  { name: 'Data Science & AI', tag: 'Python, Machine Learning, SQL, PyTorch' },
  { name: 'Human Resources', tag: 'Talent Acquisition, Culture, Onboarding, DEI' }
]

export default function SeoContentSection() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section aria-label="ATS Resume Knowledge and FAQ" className="space-y-12 mt-12 text-slate-800 dark:text-slate-200">
      
      {/* 3-STEP VALUE PROPOSITION */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Next-Generation ATS Pipeline</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Engineered for <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">Maximum Interview Callbacks</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Traditional resume templates fail modern ATS filters. ATS Studio combines 4-pillar deep diagnostic scoring with Google XYZ formula rewriting to get you past automated screening.
        </p>
      </div>

      {/* 3 CARDS: HOW IT WORKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TiltCard3D maxTilt={6}>
          <div className="h-full p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-indigo-500/20 shadow-xl shadow-indigo-500/5 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black text-lg">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-500" />
              Instant 4-Pillar Scan
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Upload any PDF or TXT resume. Our spatial parser extracts structure and evaluates keyword density, quantifiable impact metrics, ATS readability, and layout integrity (0–100%).
            </p>
          </div>
        </TiltCard3D>

        <TiltCard3D maxTilt={6}>
          <div className="h-full p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-indigo-500/20 shadow-xl shadow-indigo-500/5 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-lg">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              STAR Bullet Elevation
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Use 1-click AI optimization to transform passive bullet points into high-impact Google XYZ statements (*Accomplished [X], measured by [Y], by doing [Z]*), boosting your score to 90%+.
            </p>
          </div>
        </TiltCard3D>

        <TiltCard3D maxTilt={6}>
          <div className="h-full p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-indigo-500/20 shadow-xl shadow-indigo-500/5 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center font-black text-lg">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-fuchsia-500" />
              Clean ATS PDF Export
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Download your verified ATS resume directly to PDF or Word with zero watermarks, zero tracking trademarks, and 100% compliant single-column typography ready for applications.
            </p>
          </div>
        </TiltCard3D>
      </div>

      {/* UNIVERSAL DOMAIN CLOUD FOR SEARCH RELEVANCE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-indigo-500/20 shadow-xl shadow-indigo-500/5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              Supported Professional Industries & Career Taxonomies
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Custom-calibrated keyword and competency evaluation algorithms tailored for high-volume sectors.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            15+ Calibrated Domains
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DOMAINS_LIST.map((d, i) => (
            <div 
              key={i} 
              className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 space-y-1"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white">{d.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{d.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE FAQ ACCORDION (Google Rich Snippet Candidate) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-indigo-500/20 shadow-xl shadow-indigo-500/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Everything you need to know about ATS screening, STAR bullet points, and privacy.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div 
                key={idx}
                className="border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/60 dark:bg-slate-950/30 transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-100/70 dark:hover:bg-slate-800/40 transition"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180 text-indigo-500' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* PRIVACY & TRUST BANNER */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">100% Client-Side Privacy Guarantee</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Your resume is parsed locally in your browser memory. We never sell, log, or store your personal information.</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
          <Award className="w-4 h-4" />
          Zero Data Logging
        </div>
      </div>

    </section>
  )
}
