import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import Sidebar from '../../components/Sidebar'

function CareerAnalysis() {
  const navigate = useNavigate()

  const [selectedCareer, setSelectedCareer] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)

  const skills = [
    {
      icon: '🐍',
      name: 'Python',
      level: 'Strong foundation',
      score: 92,
      description:
        'Your Python foundation is strong. Continue building projects and improving advanced Python concepts.',
    },
    {
      icon: '📊',
      name: 'Statistics',
      level: 'Needs improvement',
      score: 70,
      description:
        'Improve probability, distributions, hypothesis testing and statistical analysis for stronger Data Science skills.',
    },
    {
      icon: '🗄️',
      name: 'SQL',
      level: 'Good progress',
      score: 78,
      description:
        'Your SQL foundation is good. Focus on advanced queries, joins, aggregation and database optimization.',
    },
    {
      icon: '🤖',
      name: 'Machine Learning',
      level: 'Focus area',
      score: 64,
      description:
        'Strengthen regression, classification, model evaluation and practical machine learning projects.',
    },
  ]

  const careerPaths = [
    {
      icon: '📈',
      name: 'Data Analyst',
      description:
        'Strong match for your SQL and analytical skills.',
      score: 86,
      details:
        'Data Analyst is a strong option because your SQL and analytical foundation already align well with this career.',
    },
    {
      icon: '🧠',
      name: 'Machine Learning Engineer',
      description:
        'Great future option after strengthening ML.',
      score: 78,
      details:
        'This can become a strong career option after you improve Machine Learning, mathematics and model deployment skills.',
    },
    {
      icon: '💻',
      name: 'Python Developer',
      description:
        'Your Python foundation makes this a good option.',
      score: 74,
      details:
        'Your Python skills provide a good starting point. Focus on frameworks, APIs, databases and software development practices.',
    },
  ]

  return (
    <div className="career-page">

      {/* =========================
          COMMON SIDEBAR
      ========================= */}

      <Sidebar />


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="career-main">

        {/* =========================
            HEADER
        ========================= */}

        <header className="career-header">

          <p className="small-heading">
            AI CAREER ANALYSIS
          </p>

          <h1>
            Find Your Best Career Path
          </h1>

          <p>
            SkillBridge analyzes your current skills and learning
            progress to suggest career paths that fit you best.
          </p>

        </header>


        {/* =========================
            MAIN RESULT
        ========================= */}

        <section className="career-result-card">

          <div className="career-result-content">

            <span className="recommendation-badge">
              ✨ BEST MATCH
            </span>

            <h2>
              Data Scientist
            </h2>

            <p>
              Your current skill profile shows strong potential
              for a career in Data Science.
            </p>

            <div className="career-result-tags">

              <span>Python</span>
              <span>SQL</span>
              <span>Statistics</span>
              <span>Machine Learning</span>

            </div>

          </div>

          <div className="career-score">

            <strong>
              92%
            </strong>

            <span>
              Career Match
            </span>

          </div>

        </section>


        {/* =========================
            SKILL ANALYSIS
        ========================= */}

        <section className="career-section">

          <div className="career-section-heading">

            <p className="small-heading">
              SKILL ANALYSIS
            </p>

            <h2>
              Your Current Skill Profile
            </h2>

            <p>
              These skills are influencing your career recommendation.
            </p>

          </div>

          <div className="career-skills-grid">

            {skills.map((skill) => (

              <div
                className={`career-skill-card ${
                  selectedSkill?.name === skill.name
                    ? 'selected'
                    : ''
                }`}
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
              >

                <div className="career-skill-top">

                  <span className="career-skill-icon">
                    {skill.icon}
                  </span>

                  <strong>
                    {skill.score}%
                  </strong>

                </div>

                <h3>
                  {skill.name}
                </h3>

                <p>
                  {skill.level}
                </p>

                <div className="career-progress">

                  <div
                    className="career-progress-fill"
                    style={{
                      width: `${skill.score}%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>


          {/* SELECTED SKILL DETAILS */}

          {selectedSkill && (

            <div className="selected-skill-card">

              <div>

                <p className="small-heading">
                  SKILL INSIGHT
                </p>

                <h3>
                  {selectedSkill.icon} {selectedSkill.name}
                </h3>

                <p>
                  {selectedSkill.description}
                </p>

                <strong>
                  Current Score: {selectedSkill.score}%
                </strong>

              </div>

              <button
                type="button"
                className="outline-button"
                onClick={() => setSelectedSkill(null)}
              >
                Close
              </button>

            </div>

          )}

        </section>


        {/* =========================
            IMPROVEMENT AREAS
        ========================= */}

        <section className="career-improvement">

          <div>

            <span className="recommendation-badge">
              🎯 AI INSIGHT
            </span>

            <h2>
              What should you focus on next?
            </h2>

            <p>
              Your strongest foundation is Python. To improve your
              Data Scientist career match, focus next on Statistics
              and Machine Learning.
            </p>

          </div>

          <div className="career-focus-list">

            <div>
              <span>1</span>
              <p>Strengthen Statistics</p>
            </div>

            <div>
              <span>2</span>
              <p>Complete Machine Learning fundamentals</p>
            </div>

            <div>
              <span>3</span>
              <p>Build practical Data Science projects</p>
            </div>

          </div>

        </section>


        {/* =========================
            OTHER CAREER PATHS
        ========================= */}

        <section className="career-section">

          <div className="career-section-heading">

            <p className="small-heading">
              OTHER OPTIONS
            </p>

            <h2>
              Recommended Career Paths
            </h2>

            <p>
              Explore other career options based on your current profile.
            </p>

          </div>

          <div className="career-paths">

            {careerPaths.map((career) => (

              <div
                className={`career-path-card ${
                  selectedCareer?.name === career.name
                    ? 'selected'
                    : ''
                }`}
                key={career.name}
                onClick={() => setSelectedCareer(career)}
              >

                <div className="career-path-info">

                  <span>
                    {career.icon}
                  </span>

                  <div>

                    <h3>
                      {career.name}
                    </h3>

                    <p>
                      {career.description}
                    </p>

                  </div>

                </div>

                <strong>
                  {career.score}%
                </strong>

              </div>

            ))}

          </div>


          {/* SELECTED CAREER DETAILS */}

          {selectedCareer && (

            <div className="selected-skill-card">

              <div>

                <p className="small-heading">
                  CAREER INSIGHT
                </p>

                <h3>
                  {selectedCareer.icon} {selectedCareer.name}
                </h3>

                <p>
                  {selectedCareer.details}
                </p>

                <strong>
                  Career Match: {selectedCareer.score}%
                </strong>

              </div>

              <button
                type="button"
                className="outline-button"
                onClick={() => setSelectedCareer(null)}
              >
                Close
              </button>

            </div>

          )}

        </section>


        {/* =========================
            ACTIONS
        ========================= */}

        <div className="career-actions">

          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate('/roadmap')}
          >
            Start Learning Roadmap →
          </button>

          <button
            type="button"
            className="outline-button"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  )
}

export default CareerAnalysis
