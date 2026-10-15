import { useState } from 'react'
import '../../App.css'
import Sidebar from '../../components/Sidebar'

function Roadmap() {
  const [selectedStep, setSelectedStep] = useState(null)

  const roadmap = [
    {
      number: '✓',
      title: 'Python Fundamentals',
      description:
        'Learn Python basics, variables, functions, loops and data structures.',
      progress: 100,
      status: 'Completed',
      className: 'completed',
      details:
        'You have completed the Python foundation. Continue practicing with real-world data projects.',
    },
    {
      number: '✓',
      title: 'SQL & Databases',
      description:
        'Learn SQL queries, databases, joins, filtering and data management.',
      progress: 100,
      status: 'Completed',
      className: 'completed',
      details:
        'Your SQL foundation is complete. Practice complex queries, joins, aggregation and database optimization.',
    },
    {
      number: '3',
      title: 'Statistics for Data Science',
      description:
        'Learn probability, statistics, distributions and data analysis.',
      progress: 70,
      status: 'Currently Learning',
      className: 'current',
      details:
        'Focus on probability, distributions, hypothesis testing, correlation, regression and practical data analysis.',
    },
    {
      number: '4',
      title: 'Machine Learning',
      description:
        'Learn machine learning algorithms and build practical projects.',
      progress: 64,
      status: 'Upcoming',
      className: '',
      details:
        'Start with supervised and unsupervised learning, model evaluation and practical machine learning projects.',
    },
  ]

  return (
    <div className="roadmap-page">

      {/* =========================
          COMMON SIDEBAR
      ========================= */}

      <Sidebar />


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="roadmap-main">

        <header className="roadmap-header">

          <div>
            <p className="small-heading">
              YOUR LEARNING JOURNEY
            </p>

            <h1>
              Learning Roadmap
            </h1>

            <p>
              Follow your personalized path to become a
              Data Science professional.
            </p>
          </div>

        </header>


        {/* SUMMARY */}

        <section className="roadmap-summary">

          <div className="stat-card">
            <span>✅</span>
            <p>Completed</p>
            <h2>2</h2>
          </div>

          <div className="stat-card">
            <span>🔥</span>
            <p>Current Step</p>
            <h2>3</h2>
          </div>

          <div className="stat-card">
            <span>🎯</span>
            <p>Overall Progress</p>
            <h2>83%</h2>
          </div>

        </section>


        {/* ROADMAP */}

        <section className="roadmap-section">

          <div className="section-title-row">

            <div>
              <p className="small-heading">
                DATA SCIENCE PATH
              </p>

              <h2>
                Your Roadmap
              </h2>
            </div>

          </div>


          <div className="roadmap-timeline">

            {roadmap.map((step, index) => (

              <div
                className={`roadmap-item ${step.className} ${
                  selectedStep?.title === step.title
                    ? 'selected'
                    : ''
                }`}
                key={step.title}
                onClick={() => setSelectedStep(step)}
              >

                <div className="roadmap-marker">
                  {step.number}
                </div>

                <div className="roadmap-content">

                  <div className="roadmap-content-header">

                    <div>

                      <span className="roadmap-status">
                        {step.status}
                      </span>

                      <h3>
                        {step.title}
                      </h3>

                    </div>

                    <strong>
                      {step.progress}%
                    </strong>

                  </div>

                  <p>
                    {step.description}
                  </p>

                  <div className="roadmap-local-progress">

                    <div
                      style={{
                        width: `${step.progress}%`,
                      }}
                    ></div>

                  </div>

                </div>

                {index !== roadmap.length - 1 && (
                  <div className="roadmap-connector"></div>
                )}

              </div>

            ))}

          </div>


          {/* SELECTED STEP */}

          {selectedStep && (

            <div className="roadmap-selected-card">

              <div>

                <p className="small-heading">
                  ROADMAP STEP
                </p>

                <h3>
                  {selectedStep.number}{' '}
                  {selectedStep.title}
                </h3>

                <p>
                  {selectedStep.details}
                </p>

                <strong>
                  Progress: {selectedStep.progress}%
                </strong>

              </div>

              <button
                type="button"
                className="outline-button"
                onClick={() =>
                  setSelectedStep(null)
                }
              >
                Close
              </button>

            </div>

          )}

        </section>

      </main>

    </div>
  )
}

export default Roadmap