import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const navigate = useNavigate()

  return (
    <main className="hero-section">
      <div className="hero-content">
        <div className="badge">
          ✨ AI-Powered Career Platform
        </div>

        <h1>
          Build Skills.
          <br />
          <span>Build Your Future.</span>
        </h1>

        <p>
          SkillBridge AI helps students discover the right skills,
          create personalized learning paths, and prepare for their
          dream careers with the power of AI.
        </p>

        <div className="hero-buttons">
          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate('/signup')}
          >
            Start Learning →
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate('/skills')}
          >
            Explore Skills
          </button>
        </div>

        <div className="trust-text">
          🚀 Built for the next generation of learners
        </div>
      </div>

      <div className="hero-card">
        <div className="card-header">
          <div className="ai-icon">AI</div>

          <div>
            <h3>Skill Assessment</h3>
            <p>AI Career Analysis</p>
          </div>
        </div>

        <div className="progress-area">
          <div className="progress-label">
            <span>Your Skill Match</span>
            <strong>87%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: '87%' }}
            />
          </div>
        </div>

        <div className="skill-list">
          <div className="skill-item">
            <span>Python</span>
            <strong>92%</strong>
          </div>

          <div className="skill-item">
            <span>Data Science</span>
            <strong>84%</strong>
          </div>

          <div className="skill-item">
            <span>Machine Learning</span>
            <strong>78%</strong>
          </div>
        </div>

        <button
          type="button"
          className="analysis-btn"
          onClick={() => navigate('/career-analysis')}
        >
          View AI Analysis →
        </button>
      </div>
    </main>
  )
}

export default HeroSection
