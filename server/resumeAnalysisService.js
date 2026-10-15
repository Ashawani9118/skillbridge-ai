import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

const SKILLS = [
  'Python',
  'Java',
  'JavaScript',
  'TypeScript',
  'C',
  'C++',
  'C#',
  'HTML',
  'CSS',
  'React',
  'React.js',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'SQL',
  'PostgreSQL',
  'Git',
  'GitHub',
  'Docker',
  'AWS',
  'Azure',
  'Machine Learning',
  'Deep Learning',
  'Artificial Intelligence',
  'Data Science',
  'Data Analysis',
  'Pandas',
  'NumPy',
  'Matplotlib',
  'Seaborn',
  'Scikit-learn',
  'TensorFlow',
  'PyTorch',
  'NLP',
  'Power BI',
  'Tableau',
  'Excel',
  'Statistics',
  'Figma',
  'UI/UX',
  'REST API',
  'REST APIs',
]

const SECTION_PATTERNS = {
  contact: [
    'contact',
    'phone',
    'mobile',
    'email',
    'linkedin',
    'github',
  ],
  summary: [
    'summary',
    'career summary',
    'professional summary',
    'profile',
    'objective',
    'career objective',
  ],
  education: [
    'education',
    'academic',
    'qualification',
    'university',
    'college',
    'degree',
  ],
  experience: [
    'experience',
    'work experience',
    'employment',
    'internship',
    'professional experience',
  ],
  skills: [
    'skills',
    'technical skills',
    'technical knowledge',
    'technologies',
    'competencies',
  ],
  projects: [
    'projects',
    'project',
    'personal projects',
    'academic projects',
  ],
  certifications: [
    'certifications',
    'certificates',
    'achievements',
    'credentials',
  ],
}

function normalizeText(text = '') {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function containsKeyword(text, keyword) {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

function extractSkills(text) {
  const foundSkills = []

  for (const skill of SKILLS) {
    const pattern = new RegExp(
      `(^|[^a-zA-Z0-9+#.-])${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[^a-zA-Z0-9+#.-])`,
      'i'
    )

    if (pattern.test(text)) {
      foundSkills.push(skill)
    }
  }

  return [...new Set(foundSkills)]
}

function detectSections(text) {
  const normalizedText = text.toLowerCase()

  const sections = {}

  for (const [section, keywords] of Object.entries(SECTION_PATTERNS)) {
    sections[section] = keywords.some((keyword) =>
      normalizedText.includes(keyword.toLowerCase())
    )
  }

  return sections
}

function calculateScore(sections, skillCount) {
  let score = 0

  if (sections.contact) score += 10
  if (sections.summary) score += 10
  if (sections.education) score += 15
  if (sections.experience) score += 20
  if (sections.skills) score += 15
  if (sections.projects) score += 15
  if (sections.certifications) score += 5

  score += Math.min(skillCount, 10)

  return Math.min(score, 100)
}

function getScoreLevel(score) {
  if (score >= 85) return 'Excellent'
  if (score >= 70) return 'Strong'
  if (score >= 50) return 'Good'
  if (score >= 30) return 'Needs Improvement'

  return 'Beginner'
}

function generateRecommendations(text, sections, skills) {
  const recommendations = []

  if (!sections.summary) {
    recommendations.push(
      'Add a clear professional summary or career objective.'
    )
  }

  if (!sections.skills) {
    recommendations.push(
      'Add a dedicated Technical Skills section.'
    )
  }

  if (!sections.projects) {
    recommendations.push(
      'Add relevant academic or personal projects with measurable outcomes.'
    )
  }

  if (!sections.experience) {
    recommendations.push(
      'Add internship, work experience, or practical experience if available.'
    )
  }

  if (!sections.education) {
    recommendations.push(
      'Add a clear Education section with degree, institution and relevant details.'
    )
  }

  if (!sections.certifications) {
    recommendations.push(
      'Add relevant certifications, courses or achievements.'
    )
  }

  if (skills.length < 5) {
    recommendations.push(
      'Highlight more relevant technical skills and tools used in your projects.'
    )
  }

  if (!containsKeyword(text, 'linkedin')) {
    recommendations.push(
      'Add your LinkedIn profile URL to strengthen your professional presence.'
    )
  }

  if (!containsKeyword(text, 'github')) {
    recommendations.push(
      'Add your GitHub profile URL to showcase coding projects.'
    )
  }

  return recommendations.slice(0, 8)
}

async function extractPdfText(filePath) {
  const buffer = fs.readFileSync(filePath)

  const data = new Uint8Array(buffer)

  const loadingTask = getDocument({
    data,
    disableWorker: true,
  })

  const pdf = await loadingTask.promise

  let extractedText = ''

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber)

    const content = await page.getTextContent()

    const pageText = content.items
      .map((item) => item.str || '')
      .join(' ')

    extractedText += `${pageText}\n`
  }

  const normalizedText = normalizeText(extractedText)

  if (normalizedText.length < 30) {
    throw new Error(
      'Could not extract enough text from the resume. Please upload a text-based PDF/DOCX/TXT resume.'
    )
  }

  return normalizedText
}

async function extractText(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Resume file not found: ${filePath}`)
  }

  const extension = path.extname(filePath).toLowerCase()

  if (extension === '.pdf') {
    return await extractPdfText(filePath)
  }

  if (extension === '.docx') {
    const result = await mammoth.extractRawText({
      path: filePath,
    })

    const text = normalizeText(result.value || '')

    if (text.length < 30) {
      throw new Error(
        'Could not extract enough text from the resume. Please upload a text-based PDF/DOCX/TXT resume.'
      )
    }

    return text
  }

  if (extension === '.txt') {
    const text = normalizeText(
      fs.readFileSync(filePath, 'utf8')
    )

    if (text.length < 30) {
      throw new Error(
        'Could not extract enough text from the resume.'
      )
    }

    return text
  }

  throw new Error(
    'Unsupported file format. Please upload a PDF, DOCX, or TXT resume.'
  )
}

export async function analyzeResume(filePath) {
  const extractedText = await extractText(filePath)

  const skills = extractSkills(extractedText)

  const sections = detectSections(extractedText)

  const wordCount = extractedText
    .split(/\s+/)
    .filter(Boolean).length

  const skillCount = skills.length

  const score = calculateScore(
    sections,
    skillCount
  )

  const level = getScoreLevel(score)

  const recommendations = generateRecommendations(
    extractedText,
    sections,
    skills
  )

  return {
    success: true,
    score,
    level,
    wordCount,
    skills,
    skillCount,
    sections,
    recommendations,
    extractedText,
  }
}