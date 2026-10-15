import { useRef, useState } from 'react'
import '../../App.css'
import Sidebar from '../../components/Sidebar'

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'
).replace(/\/$/, '')

const RESUME_API_URL = `${API_BASE_URL}/api/resume/analyze`

function ResumeAnalysis() {
  const fileInputRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState('')


  /* =====================================================
     FILE VALIDATION
  ===================================================== */

  const handleFile = (file) => {
    if (!file) return

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ]

    const fileExtension = file.name
      .split('.')
      .pop()
      .toLowerCase()

    if (
      !allowedTypes.includes(file.type) &&
      !['pdf', 'doc', 'docx'].includes(fileExtension)
    ) {
      setError(
        'Please upload a PDF or DOC/DOCX resume.'
      )
      setSelectedFile(null)
      setAnalyzed(false)
      setAnalysis(null)
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        'Resume size should be less than 10 MB.'
      )
      setSelectedFile(null)
      setAnalyzed(false)
      setAnalysis(null)
      return
    }

    setSelectedFile(file)
    setAnalyzed(false)
    setAnalysis(null)
    setError('')
  }


  /* =====================================================
     FILE INPUT
  ===================================================== */

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    handleFile(file)
  }


  /* =====================================================
     DRAG & DROP
  ===================================================== */

  const handleDrop = (event) => {
    event.preventDefault()
    setDragActive(false)

    const file = event.dataTransfer.files?.[0]
    handleFile(file)
  }


  /* =====================================================
     RESUME ANALYSIS
  ===================================================== */

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError('')
    setAnalyzed(false)
    setAnalysis(null)

    try {
      const formData = new FormData()

      formData.append(
        'resume',
        selectedFile
      )

      const response = await fetch(
        RESUME_API_URL,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
            'Resume analysis failed. Please try again.'
        )
      }

      setAnalysis(data.analysis)
      setAnalyzed(true)

    } catch (err) {
      console.error(
        'Resume analysis error:',
        err
      )

      setError(
        err?.message ||
          'Unable to connect to the Resume Analysis API. Please make sure the backend is running.'
      )

    } finally {
      setLoading(false)
    }
  }


  /* =====================================================
     REMOVE FILE
  ===================================================== */

  const removeFile = () => {
    setSelectedFile(null)
    setAnalyzed(false)
    setAnalysis(null)
    setError('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }


  /* =====================================================
     FORMAT SECTION NAME
  ===================================================== */

  const formatSectionName = (section) => {
    const names = {
      contact: 'Contact',
      summary: 'Summary',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
    }

    return names[section] || section
  }


  /* =====================================================
     DETECTED / MISSING SECTIONS
  ===================================================== */

  const detectedSections = analysis
    ? Object.entries(
        analysis.sections || {}
      )
        .filter(([, exists]) => exists)
        .map(([section]) =>
          formatSectionName(section)
        )
    : []

  const missingSections = analysis
    ? Object.entries(
        analysis.sections || {}
      )
        .filter(([, exists]) => !exists)
        .map(([section]) =>
          formatSectionName(section)
        )
    : []


  /* =====================================================
     SCORE
  ===================================================== */

  const score = Number(
    analysis?.score || 0
  )

  const scoreMessage =
    score >= 85
      ? 'Excellent resume profile'
      : score >= 70
        ? 'Strong resume profile'
        : score >= 50
          ? 'Good foundation with room to improve'
          : 'Needs improvement'


  return (
    <div className="resume-analysis-page">

      {/* =================================================
          COMMON SIDEBAR
      ================================================= */}

      <Sidebar />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="resume-analysis-main">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="resume-page-header">

          <div>

            <div className="resume-eyebrow">
              RESUME ANALYSIS
            </div>

            <h1>
              Optimize Your Resume
            </h1>

            <p>
              Upload your resume and get AI-powered
              insights to improve your career profile.
            </p>

          </div>

          <div className="resume-header-badge">

            <span>
              ✦
            </span>

            AI Powered

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div
            style={{
              marginBottom: '20px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              color: '#be123c',
              fontSize: '14px',
            }}
          >
            {error}
          </div>

        )}


        {/* =================================================
            UPLOAD SECTION
        ================================================= */}

        <section className="resume-upload-card">

          <div className="resume-section-heading">

            <div>

              <h2>
                Upload Your Resume
              </h2>

              <p>
                Upload your latest resume to start
                the analysis.
              </p>

            </div>

            <div className="resume-file-support">
              PDF • DOC • DOCX
            </div>

          </div>


          {!selectedFile ? (

            <div
              className={`resume-drop-zone ${
                dragActive
                  ? 'drag-active'
                  : ''
              }`}
              onDragOver={(event) => {
                event.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={() =>
                setDragActive(false)
              }
              onDrop={handleDrop}
              onClick={() =>
                fileInputRef.current?.click()
              }
            >

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                hidden
              />

              <div className="resume-upload-icon">
                ↑
              </div>

              <h3>
                Drop your resume here
              </h3>

              <p>
                or click to browse from your computer
              </p>

              <span className="resume-upload-limit">
                Maximum file size: 10 MB
              </span>

            </div>

          ) : (

            <div className="resume-selected-file">

              <div className="resume-file-icon">
                📄
              </div>

              <div className="resume-file-info">

                <h3>
                  {selectedFile.name}
                </h3>

                <p>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)}
                  {' MB'}
                  {' • '}
                  {selectedFile.name
                    .split('.')
                    .pop()
                    .toUpperCase()}
                </p>

              </div>

              <button
                type="button"
                className="resume-remove-btn"
                onClick={removeFile}
                disabled={loading}
              >
                Remove
              </button>

            </div>

          )}


          {selectedFile && !analyzed && (

            <button
              type="button"
              className="resume-analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="resume-spinner"></span>
                  Analyzing Resume...
                </>
              ) : (
                <>
                  ✦ Analyze Resume
                </>
              )}

            </button>

          )}

        </section>


        {/* =================================================
            ANALYSIS RESULTS
        ================================================= */}

        {analyzed && analysis && (

          <section className="resume-results">

            {/* RESULTS HEADER */}

            <div className="resume-results-header">

              <div>

                <div className="resume-eyebrow">
                  ANALYSIS COMPLETE
                </div>

                <h2>
                  Your Resume Insights
                </h2>

                <p>
                  Here's how your resume currently performs
                  and where you can improve.
                </p>

              </div>


              {/* SCORE */}

              <div className="resume-score-card">

                <div className="resume-score-circle">

                  <strong>
                    {score}
                  </strong>

                  <span>
                    /100
                  </span>

                </div>

                <div>

                  <strong>
                    Resume Score
                  </strong>

                  <small>
                    {analysis.level}
                  </small>

                </div>

              </div>

            </div>


           {/* =================================================
           SCORE SUMMARY
           ================================================= */}
<div
  style={{
    marginBottom: '18px',
    padding: '18px 20px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
  }}
>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '10px',
    }}
  >
    <div>
      <strong
        style={{
          color: 'var(--text-main)',
          fontSize: '14px',
        }}
      >
        Resume Quality
      </strong>

      <div
        style={{
          color: 'var(--text-muted)',
          fontSize: '12px',
          marginTop: '4px',
        }}
      >
        {scoreMessage}
      </div>
    </div>

    <strong
      style={{
        color: 'var(--primary)',
        fontSize: '14px',
      }}
    >
      {score}%
    </strong>
  </div>

  <div
    style={{
      width: '100%',
      height: '8px',
      borderRadius: '999px',
      background: 'var(--border)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: `${Math.min(
          Math.max(score, 0),
          100
        )}%`,
        height: '100%',
        borderRadius: '999px',
        background: 'var(--primary)',
        transition: 'width 0.6s ease',
      }}
    />
  </div>
</div>
            {/* OVERVIEW */}

            <div className="resume-overview-grid">

              <div className="resume-insight-card">

                <span className="resume-card-icon">
                  ✓
                </span>

                <div>

                  <strong>
                    Skills Detected
                  </strong>

                  <span>
                    {analysis.skillCount}
                  </span>

                </div>

                <p>
                  Technical skills detected from
                  your resume.
                </p>

              </div>


              <div className="resume-insight-card">

                <span className="resume-card-icon">
                  Aa
                </span>

                <div>

                  <strong>
                    Resume Words
                  </strong>

                  <span>
                    {analysis.wordCount}
                  </span>

                </div>

                <p>
                  Readable words extracted from
                  the uploaded resume.
                </p>

              </div>


              <div className="resume-insight-card">

                <span className="resume-card-icon">
                  ◈
                </span>

                <div>

                  <strong>
                    Sections Found
                  </strong>

                  <span>
                    {detectedSections.length}
                  </span>

                </div>

                <p>
                  {missingSections.length > 0
                    ? `${missingSections.length} section(s) can still be added.`
                    : 'All major resume sections were detected.'}
                </p>

              </div>

            </div>


            {/* =================================================
                SKILLS + SECTIONS
            ================================================= */}

            <div className="resume-analysis-grid">

              {/* SKILLS */}

              <div className="resume-result-panel">

                <div className="resume-panel-header">

                  <h3>
                    Detected Skills
                  </h3>

                  <span>
                    {analysis.skillCount} Skills
                  </span>

                </div>

                <div className="resume-skills-list">

                  {analysis.skills?.length > 0 ? (
                    analysis.skills.map((skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>
                      No supported skills detected.
                    </p>
                  )}

                </div>

              </div>


              {/* SECTIONS */}

              <div className="resume-result-panel">

                <div className="resume-panel-header">

                  <h3>
                    Resume Sections
                  </h3>

                  <span>
                    {detectedSections.length} Found
                  </span>

                </div>

                <div className="resume-missing-list">

                  {detectedSections.length > 0 && (

                    <div>

                      <span>
                        ✓
                      </span>

                      <strong>
                        Detected:{' '}
                        {detectedSections.join(', ')}
                      </strong>

                    </div>

                  )}


                  {missingSections.length > 0 && (

                    <div>

                      <span>
                        !
                      </span>

                      <strong>
                        Missing:{' '}
                        {missingSections.join(', ')}
                      </strong>

                    </div>

                  )}


                  {detectedSections.length === 0 &&
                    missingSections.length === 0 && (

                      <div>

                        <span>
                          —
                        </span>

                        <strong>
                          No section data available.
                        </strong>

                      </div>

                  )}

                </div>

              </div>

            </div>


            {/* =================================================
                STRENGTHS + RECOMMENDATIONS
            ================================================= */}

            <div className="resume-strengths-grid">

              {/* STRENGTHS */}

              <div className="resume-result-panel">

                <div className="resume-panel-header">

                  <h3>
                    Detected Strengths
                  </h3>

                </div>

                <ul className="resume-check-list">

                  {analysis.skills?.length > 0 && (

                    <li>

                      <span>
                        ✓
                      </span>

                      {analysis.skillCount} technical skill
                      {analysis.skillCount === 1
                        ? ''
                        : 's'} detected

                    </li>

                  )}


                  {analysis.sections?.summary && (

                    <li>

                      <span>
                        ✓
                      </span>

                      Career summary/objective detected

                    </li>

                  )}


                  {analysis.sections?.education && (

                    <li>

                      <span>
                        ✓
                      </span>

                      Education section detected

                    </li>

                  )}


                  {analysis.sections?.experience && (

                    <li>

                      <span>
                        ✓
                      </span>

                      Experience section detected

                    </li>

                  )}


                  {analysis.sections?.projects && (

                    <li>

                      <span>
                        ✓
                      </span>

                      Projects section detected

                    </li>

                  )}


                  {analysis.sections?.certifications && (

                    <li>

                      <span>
                        ✓
                      </span>

                      Certifications section detected

                    </li>

                  )}


                  {analysis.wordCount > 0 && (

                    <li>

                      <span>
                        ✓
                      </span>

                      Resume text successfully extracted

                    </li>

                  )}


                  {!analysis.sections?.education &&
                    !analysis.sections?.projects &&
                    !analysis.sections?.experience &&
                    analysis.skills?.length === 0 && (

                      <li>

                        <span>
                          →
                        </span>

                        Add clear resume sections
                        and relevant skills

                      </li>

                  )}

                </ul>

              </div>


              {/* RECOMMENDATIONS */}

              <div className="resume-result-panel">

                <div className="resume-panel-header">

                  <h3>
                    AI Recommendations
                  </h3>

                </div>

                <ul className="resume-check-list">

                  {analysis.recommendations?.length > 0 ? (

                    analysis.recommendations.map(
                      (recommendation, index) => (

                        <li
                          key={`${recommendation}-${index}`}
                        >

                          <span>
                            →
                          </span>

                          {recommendation}

                        </li>

                      )
                    )

                  ) : (

                    <li>

                      <span>
                        ✓
                      </span>

                      No major recommendations
                      at this stage.

                    </li>

                  )}

                </ul>

              </div>

            </div>

          </section>

        )}


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!selectedFile && !analyzed && (

          <section className="resume-info-section">

            <div className="resume-info-item">

              <div className="resume-info-number">
                01
              </div>

              <div>

                <h3>
                  Upload
                </h3>

                <p>
                  Upload your latest resume in PDF
                  or DOCX format.
                </p>

              </div>

            </div>


            <div className="resume-info-item">

              <div className="resume-info-number">
                02
              </div>

              <div>

                <h3>
                  Analyze
                </h3>

                <p>
                  SkillBridge AI reviews your skills,
                  experience and resume structure.
                </p>

              </div>

            </div>


            <div className="resume-info-item">

              <div className="resume-info-number">
                03
              </div>

              <div>

                <h3>
                  Improve
                </h3>

                <p>
                  Get actionable recommendations to
                  strengthen your professional profile.
                </p>

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  )
}

export default ResumeAnalysis