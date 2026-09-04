import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, FileText, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import TiltCard3D from './3d/TiltCard3D'

// Multi-domain pre-loaded samples for instant testing
const SAMPLE_RESUMES = {
  healthcare: {
    label: '🩺 Healthcare / Clinical Nurse',
    domain: 'healthcare',
    text: `Alex Rivera, RN
Clinical Nurse Specialist | Patient Care & Triage
alex.rivera.rn@healthmail.com | +1 (555) 345-9876 | Chicago, IL | linkedin.com/in/alex-rivera-rn

PROFESSIONAL SUMMARY
Dedicated Registered Nurse with 5+ years of acute clinical experience managing patient care protocols, triage assessments, and EHR documentation in high-volume hospital units. Proven expertise in HIPAA compliance, medication administration, and patient advocacy.

CORE SKILLS
Patient Care, HIPAA Compliance, Electronic Health Records (EHR), Epic Systems, Clinical Assessment, Triage Protocols, Medication Administration, Vital Signs Monitoring, BLS/ACLS Certified, Care Plan Development

PROFESSIONAL EXPERIENCE
Charge Nurse | Metro General Hospital | 2021 - Present
• Supervised bedside patient care for 32 acute medical-surgical patients daily, maintaining 99.2% medication administration accuracy.
• Coordinated interdisciplinary triage rounds with 8 attending physicians, reducing emergency room boarding times by 24%.
• Spearheaded unit-wide infection control initiative, cutting hospital-acquired infections by 40% across 2 consecutive quarters.

Staff Nurse | Community Health Care Center | 2018 - 2021
• Administered prescribed therapeutics and intravenous medications for 20+ daily clinical patients.
• Educated patients and families on post-discharge regimens, achieving a 97% positive patient satisfaction rating.

EDUCATION
Bachelor of Science in Nursing (BSN) | University of Illinois (2018)
BLS & ACLS Certified | American Heart Association (Active)
`
  },
  technical: {
    label: '💻 Tech / Fullstack Engineer',
    domain: 'technical',
    text: `David Chen
Senior Full-Stack Software Engineer
david.chen.dev@gmail.com | +1 (555) 876-5432 | San Francisco, CA | github.com/davidchen-dev | linkedin.com/in/davidchen-tech

PROFESSIONAL SUMMARY
Innovative Software Engineer with 6+ years of full-stack engineering experience architecting scalable distributed web systems and microservices. Expert in React, Node.js, TypeScript, PostgreSQL, and AWS cloud infrastructure.

CORE SKILLS
React, Node.js, TypeScript, JavaScript, Python, PostgreSQL, AWS, Docker, Kubernetes, Git, CI/CD, REST APIs, GraphQL, Microservices, Redis, System Design

PROFESSIONAL EXPERIENCE
Senior Software Engineer | CloudScale Systems | 2022 - Present
• Architected high-throughput real-time event streaming pipeline processing 18M+ daily events using Node.js and AWS.
• Reduced microservice API latency by 45% (85ms to 47ms) via Redis caching and PostgreSQL query optimization.
• Spearheaded migration from legacy monolithic architecture to Dockerized Kubernetes microservices, slashing deployment cycle times by 65%.

Full-Stack Developer | Innovatech Solutions | 2019 - 2022
• Developed responsive SaaS frontend application using React and TypeScript, supporting 120K+ monthly active users.
• Implemented automated CI/CD pipeline using GitHub Actions, cutting production rollback rates by 38%.

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley (2019)
AWS Certified Solutions Architect – Associate (2023)
`
  },
  sales: {
    label: '💼 B2B Sales & Account Exec',
    domain: 'sales',
    text: `Sarah Jenkins
Senior Enterprise Account Executive
sarah.jenkins.sales@outlook.com | +1 (555) 678-1234 | Austin, TX | linkedin.com/in/sarah-jenkins-sales

PROFESSIONAL SUMMARY
High-performing Enterprise Sales professional with 6+ years experience driving B2B SaaS revenue growth, managing pipeline velocity, and negotiating multi-year enterprise contracts. Consistent record of quota overachievement (135%+).

CORE SKILLS
B2B Sales, Pipeline Management, Salesforce CRM, Account Management, Contract Negotiation, Lead Generation, Solution Selling, Enterprise Deal Closing, Revenue Growth Strategy, HubSpot

PROFESSIONAL EXPERIENCE
Senior Account Executive | Nexus Enterprise Software | 2021 - Present
• Generated $2.4M in net new ARR, achieving 142% of annual quota across enterprise Fortune 500 accounts.
• Prospected and closed 28 net new logos with an average contract value (ACV) of $85K.
• Shortened average sales cycle from 95 to 58 days by establishing consultative solution selling workflows in Salesforce.

Account Executive | SaaS Dynamics Inc | 2018 - 2021
• Surpassed sales quota for 7 consecutive quarters, generating over $1.6M in cumulative contract value.
• Cultivated strategic executive relationships across 45 key accounts, maintaining a 94% customer retention rate.

EDUCATION
Bachelor of Business Administration (Marketing & Sales) | University of Texas at Austin (2018)
Salesforce Certified Administrator (2020)
`
  },
  finance: {
    label: '📊 Finance & Accounting Specialist',
    domain: 'finance',
    text: `Marcus Vance, CPA
Senior Financial Analyst & Corporate Accounting
marcus.vance.cpa@financehub.com | +1 (555) 456-7890 | New York, NY | linkedin.com/in/marcus-vance-cpa

PROFESSIONAL SUMMARY
Detail-oriented Senior Financial Analyst and licensed CPA with 5+ years experience directing P&L analysis, budgeting, financial modeling, and GAAP reconciliation. Skilled in SAP ERP, Advanced Excel modeling, and operational cost containment.

CORE SKILLS
Financial Analysis, Financial Modeling, P&L Management, Budgeting & Forecasting, GAAP Compliance, Advanced Excel (VLOOKUP, Macros), SAP ERP, General Ledger Reconciliation, Internal Controls & Audit, Cash Flow Optimization

PROFESSIONAL EXPERIENCE
Senior Financial Analyst | Global Asset Capital | 2021 - Present
• Directed multi-entity financial modeling and annual budgeting for $85M operating portfolio across 4 international subsidiaries.
• Spearheaded corporate cost-variance analysis, identifying $420K in recurring operational cost savings in FY23.
• Accelerated month-end financial close process from 9 business days to 4 business days utilizing SAP ERP automation.

Financial Analyst | Horizon Financial Group | 2018 - 2021
• Reconciled general ledger balance sheet accounts valued at $30M+ monthly with 99.8% audit precision.
• Prepared quarterly executive P&L dashboards and cash flow variance reports for the Board of Directors.

EDUCATION
Master of Science in Accounting | New York University (2018)
Certified Public Accountant (CPA) | New York State Board (Active)
`
  },
  marketing: {
    label: '🚀 Digital Marketing & Growth Lead',
    domain: 'marketing',
    text: `Emily Thorne
Growth Marketing Manager
emily.thorne.mktg@gmail.com | +1 (555) 901-2345 | Los Angeles, CA | linkedin.com/in/emily-thorne-growth

PROFESSIONAL SUMMARY
Data-driven Growth Marketing Manager with 5+ years experience orchestrating multi-channel user acquisition funnels, SEO/SEM strategies, and conversion rate optimization (CRO). Proven record of scaling organic traffic by 180%+ and lowering CAC.

CORE SKILLS
SEO/SEM Optimization, Content Marketing Strategy, Google Analytics 4, Paid Advertising (PPC/Meta/LinkedIn), Conversion Rate Optimization (CRO), Marketing Funnel Architecture, Brand Positioning, A/B Testing, Email Marketing & Automation

PROFESSIONAL EXPERIENCE
Growth Marketing Lead | Elevate Digital Media | 2021 - Present
• Spearheaded organic SEO growth strategy, increasing monthly organic search sessions from 80K to 240K (+200%) in 9 months.
• Managed $650K annual paid media budget across Google Ads and LinkedIn, decreasing cost-per-acquisition (CPA) by 32%.
• Engineered multivariate A/B testing on core landing pages, lifting site-wide lead conversion rate from 2.8% to 5.4%.

Digital Marketing Specialist | Apex Brand Studio | 2018 - 2021
• Orchestrated automated email nurture workflows generating 14,000+ qualified MQLs with an average open rate of 39%.
• Managed social media and influencer campaigns resulting in 4.5M impressions and 65K direct app downloads.

EDUCATION
Bachelor of Arts in Communications & Digital Media | UCLA (2018)
Google Analytics 4 & Google Ads Certified (2022)
`
  },
  creative: {
    label: '🎨 UI/UX & Web Designer',
    domain: 'creative',
    text: `Arjun Taneja
Frontend & Web Designer
arjuntaneja204@gmail.com | +91 8950914728 | Gurugram, India | linkedin.com/in/arjuntaneja66137a272

PROFESSIONAL PROFILE
Creative and detail-oriented Frontend Web Designer with demonstrable success in creating responsive, accessible web interfaces, component design systems, and converting Figma designs into clean web apps.

CORE COMPETENCIES & TECHNICAL SKILLS
HTML5 • CSS3 • JavaScript (ES6+) • React.js • Tailwind CSS • Figma • UI/UX Design • REST API Integration • Git • Responsive Design • Agile/Scrum

PROJECTS
Smart Portfolio & Resume Studio | React.js, Tailwind CSS | 2024
• Built interactive 3D web application with real-time dynamic scoring and responsive design.
• Integrated REST APIs for dynamic role customization and optimized page load speeds by 40%.

E-Commerce Web Portal | React, Node.js, MySQL | 2023
• Designed user-centric product catalog and responsive checkout interface.
• Decreased cart abandonment rate by 22% through clean user-experience design.

EDUCATION
Bachelor of Computer Applications (BCA) in St Andrews Inst. of Tech & Mgmt, Gurugram (2025)

CERTIFICATIONS & ACCREDITATIONS
Meta Certified Front-End Developer | Coursera
`
  },
  education: {
    label: '📚 Education & Academic Faculty',
    domain: 'education',
    text: `Dr. Elena Rostova
Secondary STEM Educator & Curriculum Lead
elena.rostova.edu@gmail.com | +1 (555) 789-0123 | Boston, MA | linkedin.com/in/elena-rostova-edu

PROFESSIONAL SUMMARY
Passionate STEM Educator with 6+ years experience designing inquiry-based curricula, integrating educational technology, and mentoring students in science and math. Proven record of boosting standardized test percentiles by 24%.

CORE SKILLS
Curriculum Design, Classroom Management, STEM Instruction, Differentiated Learning, Canvas LMS, Student Assessment, Interactive Lesson Planning, IEP Development

PROFESSIONAL EXPERIENCE
Lead Science Teacher | Westbridge Academy | 2021 - Present
• Designed interactive physics and chemistry curriculum for 280+ high school students, raising AP pass rates by 22%.
• Facilitated professional development workshops for 35 faculty members on active learning methodologies.

Secondary Math Teacher | Boston Preparatory | 2018 - 2021
• Delivered differentiated algebra and geometry lessons for diverse learning levels, achieving 96% annual course pass rate.

EDUCATION
Master of Education (M.Ed.) in Curriculum & Instruction | Boston University (2018)
`
  }
}

export default function Upload({ onUpload, onSelectSample, isScanning }) {
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return

    setLoading(true)

    try {
      let text = ''

      if (file.type === 'application/pdf') {
        const pdfjsLib = await import('pdfjs-dist/build/pdf')
        if (pdfjsLib.GlobalWorkerOptions) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
        }
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
        const numPages = pdf.numPages
        const pageTexts = []

        for (let i = 1; i <= numPages; i += 1) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()

          // Sort items by Y descending (top to bottom), then X ascending (left to right)
          const items = (content.items || []).slice().sort((a, b) => {
            const yA = a.transform ? a.transform[5] : 0
            const yB = b.transform ? b.transform[5] : 0
            if (Math.abs(yA - yB) > 4) return yB - yA
            const xA = a.transform ? a.transform[4] : 0
            const xB = b.transform ? b.transform[4] : 0
            return xA - xB
          })

          let pageText = ''
          let lastY = null

          for (const item of items) {
            const currentY = item.transform ? item.transform[5] : null
            if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 4) {
              pageText += '\n'
            } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
              pageText += ' '
            }
            pageText += item.str || ''
            if (item.hasEOL) {
              pageText += '\n'
            }
            lastY = currentY
          }

          pageTexts.push(pageText)
        }

        text = pageTexts.join('\n\n')
      } else {
        text = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result || '')
          reader.onerror = () => reject(reader.error)
          reader.readAsText(file)
        })
      }

      onUpload({ file, name: file.name, text })
      setLoading(false)
    } catch (e) {
      console.error('Resume load error:', e)
      onUpload({ file, name: file.name, text: file.name || '' })
      setLoading(false)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [], 'text/plain': [] },
    multiple: false
  })

  return (
    <div className="space-y-6">
      {/* 3D Animated Holographic Dropzone */}
      <TiltCard3D maxTilt={7}>
        <div
          {...getRootProps()}
          className={`cursor-pointer relative p-10 text-center rounded-3xl border-2 border-dashed transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl ${
            isDragActive
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 scale-[1.01]'
              : 'border-slate-300/80 dark:border-slate-700/80 hover:border-blue-500 hover:shadow-blue-500/10'
          }`}
        >
          <input {...getInputProps()} />

          <div className="mx-auto w-20 h-20 mb-4 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 transform group-hover:scale-110 transition duration-300">
            <UploadCloud className="w-10 h-10 animate-pulse" />
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
            {isDragActive ? 'Release to upload your resume...' : 'Drop your resume here to analyze'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
            Supports PDF and TXT. Instant ATS parse, multi-domain diagnostics, and in-app dynamic editor.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            Works with any profession, industry, or domain
          </div>

          {loading && (
            <div className="mt-4 p-3 rounded-xl bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-semibold animate-pulse">
              Parsing resume contents into 3D studio...
            </div>
          )}
        </div>
      </TiltCard3D>

      {/* Instant 1-Click Multi-Domain Demo Resumes */}
      <div className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Or test immediately with a multi-domain sample:
          </span>
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            1-Click Load & Score
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {Object.entries(SAMPLE_RESUMES).map(([key, item]) => (
            <button
              key={key}
              onClick={() => onSelectSample(item)}
              className="p-3 rounded-2xl text-left border border-slate-200/70 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-blue-50 hover:border-blue-400 dark:hover:bg-blue-950/40 dark:hover:border-blue-600 transition group transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                {item.label}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                Load sample <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
