import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import Sidebar from '../../components/Sidebar'

function Progress() {
  const navigate = useNavigate()
  const [selectedSkill, setSelectedSkill] = useState(null)

  const skills = [
    {
      icon: '🐍',
      name: 'Python',
      progress: 92,
      status: 'Excellent',
      description:
        'Your Python foundation is strong. Keep improving through projects and advanced data science libraries.',
    },
    {
      icon: '🗄️',
      name: 'SQL',
      progress: 78,
      status: 'Good',
      description:
        'Your SQL skills are developing well. Practice complex queries, joins, aggregation and database projects.',
    },
    {
      icon: '📊',
      name: 'Statistics',
      progress: 70,
      status: 'Improving',
      description:
        'Focus on probability, distributions, hypothesis testing and statistical analysis.',
    },
    {
      icon: '🤖',
      name: 'Machine Learning',
      progress: 64,
      status: 'Learning',
      description:
        'Build your machine learning foundation with regression, classification, model evaluation and projects.',
    },
  ]

  const activities = [
    {
      icon: '✓',
      title: 'Completed SQL & Databases',
      time: '2 days ago',
    },
    {
      icon: '📚',
      title: 'Studied Statistics',
      time: '3 days ago',
    },
    {
      icon: '🎯',
      title: 'Updated Python skill',
      time: '5 days ago',
    },
    {
      icon: '🔥',
      title: 'Maintained 7 day learning streak',
      time: '1 week ago',
    },
  ]

  const weeklyActivity = [
    {
      day: 'Mon',
      height: '55%',
      hours: '1.5h',
    },
    {
      day: 'Tue',
      height: '75%',
      hours: '2h',
    },
    {
      day: 'Wed',
      height: '45%',
      hours: '1h',
    },
    {
      day: 'Thu',
      height: '90%',
      hours: '2.5h',
    },
    {
      day: 'Fri',
      height: '65%',
      hours: '1.7h',
    },
    {
      day: 'Sat',
      height: '80%',
      hours: '2.2h',
    },
    {
      day: 'Sun',
      height: '35%',
      hours: '0.8h',
    },
  ]

  return (
    <div className="progress-page">

      {/* =========================
          COMMON SIDEBAR
      ========================= */}

      <Sidebar />


      {/* =========================
          MAIN
      ========================= */}

      <main className="progress-main">

        {/* HEADER */}

        <header className="progress-header">

          <p className="small-heading">
            YOUR PERFORMANCE
          </p>

          <h1>
            Learning Progress
          </h1>

          <p>
            Track your skills, learning activity and
            overall progress towards your career goal.
          </p>

        </header>


        {/* OVERALL */}

        <section className="overall-progress-card">

          <div className="overall-progress-top">

            <div>

              <span>
                Overall Learning Progress
              </span>

              <p>
                Keep going! You're building strong momentum.
              </p>

            </div>

            <strong>
              68%
            </strong>

          </div>


          <div className="overall-progress-bar">

            <div
              className="overall-progress-fill"
              style={{
                width: '68%',
              }}
            ></div>

          </div>


          <div className="progress-milestone">

            <span>
              🎯 Next milestone: 75%
            </span>

            <span>
              7% remaining
            </span>

          </div>

        </section>


        {/* STATS */}

        <section className="progress-stats">

          <div className="progress-stat-card">
            <span>📚</span>
            <p>Courses Completed</p>
            <h2>8</h2>
          </div>

          <div className="progress-stat-card">
            <span>⏱️</span>
            <p>Learning Hours</p>
            <h2>124</h2>
          </div>

          <div className="progress-stat-card">
            <span>🔥</span>
            <p>Current Streak</p>
            <h2>7 Days</h2>
          </div>

          <div className="progress-stat-card">
            <span>🏆</span>
            <p>Achievements</p>
            <h2>12</h2>
          </div>

        </section>


        {/* SKILLS */}

        <section className="progress-section">

          <div className="progress-section-heading">

            <p className="small-heading">
              SKILL DEVELOPMENT
            </p>

            <h2>
              Your Skills
            </h2>

            <p>
              Your current progress across important Data Science skills.
            </p>

          </div>


          <div className="progress-skill-list">

            {skills.map((skill) => (

              <div
                className={`progress-skill ${
                  selectedSkill?.name === skill.name
                    ? 'selected'
                    : ''
                }`}
                key={skill.name}
                onClick={() =>
                  setSelectedSkill(skill)
                }
              >

                <div className="progress-skill-header">

                  <span>
                    {skill.icon} {skill.name}
                  </span>

                  <div>

                    <strong>
                      {skill.progress}%
                    </strong>

                    <small>
                      {skill.status}
                    </small>

                  </div>

                </div>


                <div className="skill-progress-bar">

                  <div
                    style={{
                      width: `${skill.progress}%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>


          {/* SELECTED SKILL */}

          {selectedSkill && (

            <div className="progress-selected-card">

              <div>

                <p className="small-heading">
                  SKILL DETAILS
                </p>

                <h3>
                  {selectedSkill.icon}{' '}
                  {selectedSkill.name}
                </h3>

                <p>
                  {selectedSkill.description}
                </p>

                <strong>
                  Current Progress:{' '}
                  {selectedSkill.progress}%
                </strong>

              </div>

              <button
                type="button"
                className="outline-button"
                onClick={() =>
                  setSelectedSkill(null)
                }
              >
                Close
              </button>

            </div>

          )}

        </section>


        {/* WEEKLY ACTIVITY */}

        <section className="progress-section">

          <div className="progress-section-heading">

            <p className="small-heading">
              CONSISTENCY
            </p>

            <h2>
              Weekly Learning Activity
            </h2>

          </div>


          <div className="weekly-activity">

            {weeklyActivity.map((day) => (

              <div
                className="activity-day"
                key={day.day}
              >

                <span>
                  {day.day}
                </span>

                <div
                  className="activity-bar"
                  style={{
                    height: day.height,
                  }}
                ></div>

                <small>
                  {day.hours}
                </small>

              </div>

            ))}

          </div>

        </section>


        {/* RECENT ACTIVITY */}

        <section className="progress-section">

          <div className="progress-section-heading">

            <p className="small-heading">
              ACTIVITY
            </p>

            <h2>
              Recent Learning Activity
            </h2>

          </div>


          <div className="activity-list">

            {activities.map((activity) => (

              <div
                className="activity-item"
                key={activity.title}
              >

                <span>
                  {activity.icon}
                </span>

                <div>

                  <strong>
                    {activity.title}
                  </strong>

                  <p>
                    {activity.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* ACHIEVEMENT */}

        <section className="progress-achievement">

          <div className="achievement-icon">
            🏆
          </div>

          <div>

            <p className="small-heading">
              NEXT ACHIEVEMENT
            </p>

            <h2>
              Data Science Explorer
            </h2>

            <p>
              Complete your Statistics and Machine Learning
              fundamentals to unlock this achievement.
            </p>

          </div>

          <strong>
            2 skills left
          </strong>

        </section>


        {/* ACTIONS */}

        <div className="progress-actions">

          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate('/roadmap')}
          >
            Continue Learning →
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

export default Progress