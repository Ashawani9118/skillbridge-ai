import { useNavigate } from 'react-router-dom'
import '../../App.css'
import { logoutUser } from '../../utils/auth'
import Sidebar from '../../components/Sidebar'

function Skills() {
  const navigate = useNavigate()

  const skills = [
    {
      name: 'Python',
      icon: '🐍',
      score: 92,
      level: 'Excellent',
      status: 'Strong foundation',
      description:
        'Strong command of Python fundamentals and problem solving.',
      tone: 'excellent',
    },
    {
      name: 'SQL',
      icon: '🗄️',
      score: 78,
      level: 'Good',
      status: 'Good progress',
      description:
        'Good understanding of queries, joins and database concepts.',
      tone: 'good',
    },
    {
      name: 'Statistics',
      icon: '📊',
      score: 70,
      level: 'Developing',
      status: 'Needs improvement',
      description:
        'Continue improving probability, distributions and data analysis.',
      tone: 'developing',
    },
    {
      name: 'Machine Learning',
      icon: '🤖',
      score: 64,
      level: 'Beginner',
      status: 'Focus area',
      description:
        'Build stronger ML fundamentals through practical projects.',
      tone: 'beginner',
    },
  ]

  const averageScore = Math.round(
    skills.reduce((total, skill) => total + skill.score, 0) /
      skills.length
  )

  const strongestSkill = skills.reduce((best, skill) =>
    skill.score > best.score ? skill : best
  )

  const focusSkill = skills.reduce((lowest, skill) =>
    skill.score < lowest.score ? skill : lowest
  )

  const handleLogout = () => {
    logoutUser()

    document.body.classList.remove(
      'dark-mode',
      'light-mode'
    )

    document.body.classList.add('light-mode')

    navigate('/')
  }

  return (
    <div className="skills-page">

      {/* =================================================
          SIDEBAR
      ================================================= */}
      <Sidebar />
      {/* =================================================
          MAIN CONTENT
      ================================================= */}
      <main className="skills-main">

        <div className="skills-container">

          {/* =================================================
              HEADER
          ================================================= */}
          <header className="skills-header">

            <div className="skills-header-top">
              <div>
                <p className="small-heading">
                  MY SKILLS
                </p>

                <h1>
                  Your Skill Profile
                </h1>

                <p>
                  Track your strengths, identify skill gaps,
                  and build the capabilities needed for your
                  target career.
                </p>
              </div>

              <div className="skills-profile-badge">
                <span>SKILL READINESS</span>
                <strong>{averageScore}%</strong>
                <small>Overall</small>
              </div>
            </div>

          </header>


          {/* =================================================
              INSIGHT OVERVIEW
          ================================================= */}
          <section className="skills-overview">

            <div className="skills-overview-card">

              <div className="overview-icon">
                ✦
              </div>

              <div className="overview-content">

                <span className="overview-label">
                  STRONGEST SKILL
                </span>

                <h2>
                  {strongestSkill.name}
                </h2>

                <p>
                  {strongestSkill.score}% proficiency
                  · {strongestSkill.status}
                </p>

              </div>

            </div>


            <div className="skills-overview-card">

              <div className="overview-icon focus">
                ↑
              </div>

              <div className="overview-content">

                <span className="overview-label">
                  NEXT FOCUS
                </span>

                <h2>
                  {focusSkill.name}
                </h2>

                <p>
                  {focusSkill.score}% proficiency
                  · {focusSkill.status}
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              SKILL SECTION HEADER
          ================================================= */}
          <div className="skills-section-heading">

            <div>
              <p className="small-heading">
                CURRENT CAPABILITIES
              </p>

              <h2>
                Skill breakdown
              </h2>

              <p>
                Your current proficiency across the core
                skills required for your learning path.
              </p>
            </div>

            <span className="skills-count">
              {skills.length} Skills
            </span>

          </div>


          {/* =================================================
              SKILL CARDS
          ================================================= */}
          <section className="all-skills-grid">

            {skills.map((skill) => (
              <article
                className={`all-skill-card ${skill.tone}`}
                key={skill.name}
              >

                <div className="skill-card-top">

                  <div className="skill-identity">

                    <div className="skill-icon-box">
                      {skill.icon}
                    </div>

                    <div>
                      <h3>
                        {skill.name}
                      </h3>

                      <span className="skill-level">
                        {skill.level}
                      </span>
                    </div>

                  </div>

                  <div className="skill-score">
                    <strong>
                      {skill.score}%
                    </strong>
                  </div>

                </div>


                <p className="skill-description">
                  {skill.description}
                </p>


                <div className="skill-bar-wrapper">

                  <div className="skill-bar-meta">
                    <span>
                      Proficiency
                    </span>

                    <span>
                      {skill.score} / 100
                    </span>
                  </div>

                  <div className="skill-bar">
                    <div
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />
                  </div>

                </div>


                <div className="skill-card-footer">

                  <span className="skill-status">
                    {skill.status}
                  </span>

                  {skill.score >= 85 && (
                    <span className="skill-badge">
                      Strong
                    </span>
                  )}

                  {skill.score >= 70 &&
                    skill.score < 85 && (
                      <span className="skill-badge">
                        Building
                      </span>
                    )}

                  {skill.score < 70 && (
                    <span className="skill-badge">
                      Priority
                    </span>
                  )}

                </div>

              </article>
            ))}

          </section>


          {/* =================================================
              CAREER READINESS
          ================================================= */}
          <section className="skill-readiness-card">

            <div className="readiness-left">

              <div className="readiness-icon">
                🚀
              </div>

              <div>

                <p className="small-heading">
                  CAREER READINESS
                </p>

                <h2>
                  Keep building toward your goal
                </h2>

                <p>
                  Your strongest foundation is{' '}
                  <strong>
                    {strongestSkill.name}
                  </strong>
                  . Focus next on{' '}
                  <strong>
                    {focusSkill.name}
                  </strong>{' '}
                  to improve your overall profile.
                </p>

              </div>

            </div>

            <button
              type="button"
              className="primary-btn"
              onClick={() => navigate('/roadmap')}
            >
              View Learning Roadmap →
            </button>

          </section>


        </div>

      </main>

    </div>
  )
}

export default Skills