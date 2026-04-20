# AI Resume Analyzer

A full-stack web application that analyzes resumes for ATS compatibility, identifies skills, and provides intelligent job matching with career insights.

## 🏗️ Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: None (in-memory data for demo)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Running

1. **Clone and install dependencies:**
   ```bash
   git clone <repository>
   cd resume-analyzer
   npm install
   cd server && npm install && cd ..
   ```

2. **Start the backend:**
   ```bash
   cd server
   npm run dev  # or npm start for production
   ```
   Backend runs on http://localhost:5000

3. **Start the frontend (in new terminal):**
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:5173 with API proxy to backend

## 🎯 Features

### Core Features
- **Resume Upload**: Drag-and-drop interface for uploading PDF and TXT resumes
- **ATS Scoring**: Analyzes resume for Applicant Tracking System optimization (0-100%)
- **Skill Detection**: Identifies technical skills from resume content
- **Gap Analysis**: Highlights missing skills and keywords to improve resume
- **Job Matching**: Compare resume against job descriptions and see match percentage
- **Smart Suggestions**: AI-powered recommendations to improve resume quality

### Advanced Features
- **Intelligent Job Recommendations**: Weighted scoring system (Skills 60%, Experience 20%, Keywords 10%, Domain 10%)
- **Job Description Analysis**: Paste job descriptions to see skill matches and gaps
- **Skill Gap Roadmap**: Step-by-step learning plans for missing skills
- **Experience Level Detection**: Automatic detection of fresher vs experienced candidates
- **Dark Mode**: Full dark/light theme support with persistent preference
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Analysis**: Instant resume evaluation as you upload
- **History Tracking**: Stores last 20 analyzed resumes in local storage

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Chart.js
- React Router (future)

### Backend
- Node.js
- Express.js
- Joi (validation)
- Helmet (security)
- CORS
- Express Rate Limit

## 📁 Project Structure

```
resume-analyzer/
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── data/              # Static job data
│   ├── utils/             # Frontend utilities
│   └── ...
├── server/                # Backend Node.js app
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── server.js          # Express server
│   └── ...
├── package.json           # Frontend dependencies
├── vite.config.js         # Vite configuration
└── README.md
```

## 🔧 API Endpoints

### Resume Analysis
- `POST /api/analyze-resume` - Analyze resume text
- `POST /api/match-job` - Compare resume vs job description

### Job Data
- `GET /api/jobs` - Get all job listings
- `POST /api/suggest-jobs` - Get personalized job suggestions

## 🔒 Security

- Rate limiting (100 requests/15min per IP)
- Input validation and sanitization
- CORS configuration
- Helmet security headers
- Error message sanitization

## 🚀 Deployment

### Backend Deployment
```bash
cd server
npm run build  # if needed
npm start
```

### Frontend Deployment
```bash
npm run build
# Serve dist/ folder with any static server
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🛠 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **File Handling**: React Dropzone
- **Visualization**: Chart.js + React ChartJS-2
- **PDF Support**: PDF.js-dist
- **HTTP Client**: Axios

## 📋 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with theme toggle
│   ├── Upload.jsx          # Drag-drop resume uploader
│   ├── Dashboard.jsx       # ATS score and skills display
│   ├── Suggestions.jsx     # Improvement recommendations
│   └── JobMatch.jsx        # Job description matcher
├── utils/
│   └── analysis.js         # Core analysis algorithms
├── App.jsx                 # Main application component
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## 🚀 Quick Start

1. Install dependencies
```bash
npm install
```

2. Run dev server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

3. Build for production
```bash
npm run build
```

## 📖 How to Use

1. **Upload Resume**: Drag and drop a PDF or TXT file, or click to select
2. **View Analysis**: See ATS score, detected skills, and improvement suggestions
3. **Match with Jobs**: Paste a job description to see how well your resume matches
4. **Improve**: Follow suggestions to enhance your resume for better ATS scores

## 🧮 Analysis Algorithm

The ATS scoring system considers:
- **Technical Skills** (30%): Detects skills from a comprehensive tech stack
- **Resume Structure** (20%): Checks for Experience, Education, Projects sections
- **Achievements** (25%): Looks for action verbs and quantifiable metrics
- **Completeness** (25%): Evaluates content length and detail level

**Scoring Ranges:**
- 80-95: Excellent - Ready for top positions
- 60-79: Good - Room for improvement
- 40-59: Fair - Consider significant updates
- Below 40: Needs work - Major revisions recommended

## 🔍 Supported Skills

### Frontend
React, Vue, Angular, Next.js, Tailwind, CSS, HTML, JavaScript, TypeScript, Svelte

### Backend
Node, Express, Python, Django, Flask, Java, Spring, Go, Rust, PHP

### Database
SQL, MongoDB, PostgreSQL, MySQL, Redis, Firebase, DynamoDB, Cassandra

### Cloud & DevOps
AWS, Azure, GCP, Docker, Kubernetes, Terraform, Jenkins, GitHub Actions

### Tools & Practices
Git, REST, GraphQL, Webpack, Vite, Jest, Cypress, Linux

## 💾 Local Storage

The app stores:
- **rm_history**: Last 20 analyzed resumes with timestamps and scores
- **theme**: User's preferred color theme (light/dark)

Clear your browser's local storage to reset history.

## 🎨 Customization

### Change Scoring Formula
Edit `/src/utils/analysis.js` in the `analyzeResume()` function to adjust how scores are calculated.

### Add More Skills
Expand the `TECHNICAL_SKILLS` object in `/src/utils/analysis.js` to include domain-specific skills.

### Modify Colors
Update Tailwind CSS classes in components, or configure `tailwind.config.cjs` for global color changes.

## 🧪 Testing

1. Upload a sample resume with common tech terms (e.g., "React, Node.js, AWS")
2. Observe ATS scoring and skill detection
3. Test job matching with a sample job description
4. Toggle dark mode to verify theme switching

## 🚧 Future Enhancements

- [ ] OpenAI API integration for smarter analysis
- [ ] Improved PDF parsing with text extraction
- [ ] Resume templates and formatting suggestions
- [ ] Salary expectation analysis
- [ ] Export analysis report as PDF
- [ ] Multi-resume comparison
- [ ] REST API backend

## 📝 Notes

- This project uses a mock analysis engine in `src/utils/analysis.js`.
- For production-grade resume parsing, integrate PDF text-extraction library and analysis API (e.g., OpenAI).
- Local storage is used for history—clear it to reset the app state.
