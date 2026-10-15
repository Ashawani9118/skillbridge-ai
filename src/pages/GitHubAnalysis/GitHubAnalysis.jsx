import { useState } from 'react'
import '../../App.css'
import Sidebar from '../../components/Sidebar'

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'
).replace(/\/$/, '')

function GitHubAnalysis() {
  const [username, setUsername] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysisData, setAnalysisData] = useState(null)


  // =========================
  // GITHUB ANALYSIS API
  // =========================

  const handleAnalyze = async (e) => {
    e.preventDefault()

    const cleanUsername = username.trim()

    if (!cleanUsername) {
      setError('Please enter a GitHub username.')
      setAnalyzed(false)
      setAnalysisData(null)
      return
    }

    setError('')
    setAnalyzed(false)
    setAnalysisData(null)
    setLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/github/analyze/${encodeURIComponent(
          cleanUsername
        )}`
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'GitHub analysis failed.'
        )
      }

      setAnalysisData(result.data)
      setAnalyzed(true)
    } catch (err) {
      console.error('GitHub Analysis Error:', err)

      setError(
        err.message ||
          'Unable to analyze GitHub profile. Please try again.'
      )

      setAnalyzed(false)
      setAnalysisData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="github-page">

      {/* =========================
          COMMON SIDEBAR
      ========================= */}

      <Sidebar />


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="github-main">

        {/* HEADER */}

        <header className="github-header">

          <p className="github-eyebrow">
            GITHUB PROFILE ANALYSIS
          </p>

          <h1>
            Understand Your <span>GitHub Profile</span>
          </h1>

          <p>
            Connect your GitHub profile to analyze your projects,
            skills, experience and development level.
          </p>

        </header>


        {/* =========================
            SEARCH CARD
        ========================= */}

        <section className="github-search-card">

          <div className="github-search-icon">
            ⌘
          </div>

          <div className="github-search-content">

            <h2>
              Analyze GitHub Profile
            </h2>

            <p>
              Enter your GitHub username to get a detailed
              profile and project analysis.
            </p>

            <form
              onSubmit={handleAnalyze}
              className="github-search-form"
            >

              <div className="github-input-wrapper">

                <span>
                  @
                </span>

                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError('')
                  }}
                  required
                />

              </div>

              <button
                type="submit"
                className="github-analyze-button"
                disabled={loading}
              >
                {loading
                  ? 'Analyzing...'
                  : 'Analyze Profile'}
              </button>

            </form>

            {error && (
              <p className="github-error">
                {error}
              </p>
            )}

          </div>

        </section>


        {/* =========================
            ANALYSIS RESULT
        ========================= */}

        {analyzed && analysisData && (

          <div className="github-results">

            {/* =========================
                PROFILE
            ========================= */}

            <section className="github-profile-card">

              <div className="github-profile-avatar">

                {analysisData.profile.avatar ? (
                  <img
                    src={analysisData.profile.avatar}
                    alt={analysisData.profile.name}
                  />
                ) : (
                  analysisData.profile.name
                    .charAt(0)
                    .toUpperCase()
                )}

              </div>

              <div className="github-profile-info">

                <span className="github-label">
                  GITHUB PROFILE
                </span>

                <h2>
                  {analysisData.profile.name}
                </h2>

                <p>
                  @{analysisData.profile.username}
                </p>

                {analysisData.profile.bio && (
                  <p>
                    {analysisData.profile.bio}
                  </p>
                )}

                <div className="github-tags">

                  <span>
                    {analysisData.profile.publicRepos}{' '}
                    Repositories
                  </span>

                  <span>
                    {analysisData.profile.followers}{' '}
                    Followers
                  </span>

                  <span>
                    {analysisData.profile.following}{' '}
                    Following
                  </span>

                </div>

                <a
                  href={analysisData.profile.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub Profile →
                </a>

              </div>

            </section>


            {/* =========================
                STATS
            ========================= */}

            <section className="github-stats-grid">

              <div className="github-stat-card">

                <span className="github-stat-icon">
                  ◈
                </span>

                <h3>
                  {analysisData.summary.totalProjects}
                </h3>

                <p>
                  Projects
                </p>

              </div>


              <div className="github-stat-card">

                <span className="github-stat-icon">
                  ★
                </span>

                <h3>
                  {analysisData.summary.totalStars}
                </h3>

                <p>
                  Total Stars
                </p>

              </div>


              <div className="github-stat-card">

                <span className="github-stat-icon">
                  ⑂
                </span>

                <h3>
                  {analysisData.profile.followers}
                </h3>

                <p>
                  Followers
                </p>

              </div>


              <div className="github-stat-card">

                <span className="github-stat-icon">
                  ◆
                </span>

                <h3>
                  {analysisData.projectLevel.score}%
                </h3>

                <p>
                  Project Score
                </p>

              </div>

            </section>


            {/* =========================
                DETECTED SKILLS
            ========================= */}

            <section className="github-section">

              <div className="github-section-heading">

                <div>

                  <span>
                    TECHNOLOGIES
                  </span>

                  <h2>
                    Detected Skills
                  </h2>

                </div>

                <p>
                  Technologies detected from your public GitHub repositories
                </p>

              </div>

              <div className="project-tech">

                {analysisData.skills.length > 0 ? (
                  analysisData.skills.map((skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <span>
                    No programming language detected
                  </span>
                )}

              </div>

            </section>


            {/* =========================
                EXISTING PROJECTS
            ========================= */}

            <section className="github-section">

              <div className="github-section-heading">

                <div>

                  <span>
                    YOUR PROJECTS
                  </span>

                  <h2>
                    Existing Projects
                  </h2>

                </div>

                <p>
                  Projects detected from your GitHub profile
                </p>

              </div>

              <div className="github-project-grid">

                {analysisData.existingProjects.length > 0 ? (
                  analysisData.existingProjects.map(
                    (project) => (
                      <article
                        className="github-project-card"
                        key={project.name}
                      >

                        <div className="github-project-top">

                          <span className="project-icon">
                            ⌘
                          </span>

                          <span className="project-level intermediate">
                            {project.language}
                          </span>

                        </div>

                        <h3>
                          {project.name}
                        </h3>

                        <p>
                          {project.description}
                        </p>

                        <div className="project-tech">

                          <span>
                            ⭐ {project.stars}
                          </span>

                          <span>
                            Forks {project.forks}
                          </span>

                        </div>

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Project →
                        </a>

                      </article>
                    )
                  )
                ) : (
                  <p>
                    No public projects found.
                  </p>
                )}

              </div>

            </section>


            {/* =========================
                PROJECT LEVEL
            ========================= */}

            <section className="github-level-card">

              <div>

                <span className="github-label">
                  OVERALL PROJECT LEVEL
                </span>

                <h2>
                  {analysisData.projectLevel.level}{' '}
                  Developer
                </h2>

                <p>
                  {analysisData.projectLevel.description}
                </p>

              </div>

              <div className="github-level-score">

                <strong>
                  {analysisData.projectLevel.score}%
                </strong>

                <span>
                  Project Strength
                </span>

              </div>

            </section>


            {/* =========================
                PROJECT SUGGESTIONS
            ========================= */}

            <section className="github-section">

              <div className="github-section-heading">

                <div>

                  <span>
                    AI RECOMMENDATIONS
                  </span>

                  <h2>
                    Projects You Can Build Next
                  </h2>

                </div>

              </div>

              <div className="github-suggestion-grid">

                {analysisData.projectSuggestions.map(
                  (suggestion, index) => (

                    <article
                      className="github-suggestion-card"
                      key={suggestion.title}
                    >

                      <span>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <h3>
                        {suggestion.title}
                      </h3>

                      <p>
                        {suggestion.description}
                      </p>

                      <div>

                        {suggestion.technology
                          .split(',')
                          .map((technology) => (
                            <span key={technology}>
                              {technology.trim()}
                            </span>
                          ))}

                      </div>

                    </article>

                  )
                )}

              </div>

            </section>

          </div>

        )}

      </main>

    </div>
  )
}

export default GitHubAnalysis