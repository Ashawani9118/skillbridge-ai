import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import useAuth from '../../hooks/useAuth'

function Dashboard() {
  const navigate = useNavigate()
  const { userName } = useAuth()

  const [selectedSkill, setSelectedSkill] = useState(null)

  const displayName = userName || 'User'

  const initials = displayName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const stats = [
    { label: 'Skill Match', value: '87%', change: '+12%' },
    { label: 'Courses', value: '12', change: '+3' },
    { label: 'Learning Streak', value: '7 Days', change: '+2 days' },
    { label: 'Completed', value: '8', change: '+2' },
  ]

  const skills = [
    { name: 'Python', score: 92, level: 'Excellent' },
    { name: 'SQL', score: 78, level: 'Good' },
    { name: 'Statistics', score: 70, level: 'Intermediate' },
    { name: 'Machine Learning', score: 64, level: 'Intermediate' },
  ]

  return (
    <div className="dashboard-page">

      <Sidebar />

      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <p className="dashboard-welcome">
              Welcome back
            </p>

            <h1>
              Hello, {displayName} 👋
            </h1>

            <p className="dashboard-subtitle">
              Here&apos;s your learning progress and career overview.
            </p>
          </div>

          <div className="dashboard-profile">
            <div className="profile-avatar">
              {initials}
            </div>

            <div>
              <strong>{displayName}</strong>
              <p>Student</p>
            </div>
          </div>
        </header>

        <section className="dashboard-stats">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>

              <div className="stat-top">
                <span>✦</span>
              </div>

              <p>{stat.label}</p>

              <h2>{stat.value}</h2>

              <span className="stat-trend">
                {stat.change}
              </span>

            </div>
          ))}
        </section>

        <section className="ai-recommendation">

          <div className="ai-content">

            <span className="recommendation-badge">
              AI Powered
            </span>

            <h2>
              Your recommended career path
            </h2>

            <p>
              Based on your current skills and learning progress,
              Data Science is a strong career direction to explore.
            </p>

            <div className="ai-action-row">

              <button
                type="button"
                className="dashboard-button"
                onClick={() => navigate('/career-analysis')}
              >
                View Analysis
              </button>

              <button
                type="button"
                className="ai-secondary-button"
                onClick={() => navigate('/roadmap')}
              >
                View Roadmap
              </button>

            </div>

          </div>

          <div className="recommendation-score">

            <div className="score-circle">
              <strong>92%</strong>
            </div>

            <span>Match Score</span>

          </div>

        </section>

        <section className="dashboard-grid">

          <div className="dashboard-card">

            <div className="dashboard-card-header">
              <div>
                <p className="dashboard-card-label">
                  Skill Progress
                </p>

                <h2>
                  Your current skills
                </h2>
              </div>

              <button
                type="button"
                className="dashboard-text-button"
                onClick={() => navigate('/skills')}
              >
                View all
              </button>
            </div>

            <div className="dashboard-skills">

              {skills.map((skill) => (
                <button
                  type="button"
                  className="dashboard-skill-row"
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="dashboard-skill-info">
                    <span className="dashboard-skill-name">
                      {skill.name}
                    </span>

                    <span className="dashboard-skill-level">
                      {skill.level}
                    </span>
                  </div>

                  <div className="dashboard-skill-progress">

                    <div className="dashboard-progress-track">
                      <div
                        className="dashboard-progress-fill"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>

                    <span>{skill.score}%</span>

                  </div>
                </button>
              ))}

            </div>

            {selectedSkill && (
              <div className="dashboard-selected-skill">
                <strong>{selectedSkill.name}</strong>

                <span>
                  Current level: {selectedSkill.level}
                </span>
              </div>
            )}

          </div>

          <div className="dashboard-card">

            <div className="dashboard-card-header">
              <div>
                <p className="dashboard-card-label">
                  Quick Access
                </p>

                <h2>
                  Continue your journey
                </h2>
              </div>
            </div>

            <div className="dashboard-action-grid">

              <button
                type="button"
                className="dashboard-action-card"
                onClick={() => navigate('/career-analysis')}
              >
                <span className="dashboard-action-icon">
                  ✦
                </span>

                <span>Career Analysis</span>

                <small>
                  Explore suitable career paths
                </small>
              </button>

              <button
                type="button"
                className="dashboard-action-card"
                onClick={() => navigate('/roadmap')}
              >
                <span className="dashboard-action-icon">
                  ↗
                </span>

                <span>Learning Roadmap</span>

                <small>
                  Follow your personalized roadmap
                </small>
              </button>

              <button
                type="button"
                className="dashboard-action-card"
                onClick={() => navigate('/github-analysis')}
              >
                <span className="dashboard-action-icon">
                  ◉
                </span>

                <span>GitHub Analysis</span>

                <small>
                  Analyze your GitHub profile
                </small>
              </button>

              <button
                type="button"
                className="dashboard-action-card"
                onClick={() => navigate('/resume-analysis')}
              >
                <span className="dashboard-action-icon">
                  ▤
                </span>

                <span>Resume Analysis</span>

                <small>
                  Check your resume score
                </small>
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Dashboard