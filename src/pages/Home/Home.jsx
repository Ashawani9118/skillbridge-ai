import Navbar from '../../components/Navbar/Navbar'
import HeroSection from '../../components/HeroSection/HeroSection'
import Features from '../../components/Features/Features'
import SiteFooter from '../../components/Footer/SiteFooter'

function Home() {
  const steps = [
    {
      number: '01',
      title: 'Understand your skills',
      description:
        'Build a clear picture of your current skills, interests, and career direction.',
    },
    {
      number: '02',
      title: 'Discover your path',
      description:
        'Explore career directions and identify the skills that matter for your goals.',
    },
    {
      number: '03',
      title: 'Build and improve',
      description:
        'Follow a focused learning roadmap and track your progress as you grow.',
    },
  ]

  const careerPaths = [
    {
      title: 'Data Science',
      description:
        'Build skills in Python, statistics, SQL, and machine learning.',
      skills: 'Python • SQL • ML',
    },
    {
      title: 'Web Development',
      description:
        'Develop modern web applications and strengthen your frontend skills.',
      skills: 'React • JavaScript • APIs',
    },
    {
      title: 'AI & Machine Learning',
      description:
        'Explore intelligent systems, models, and practical AI applications.',
      skills: 'Python • ML • AI',
    },
  ]

  return (
    <div className="app">
      <Navbar />

      <HeroSection />

      <Features />

      <section
        id="how-it-works"
        className="how-it-works-section"
      >
        <div className="section-heading">
          <p>HOW IT WORKS</p>

          <h2>
            From uncertainty
            <br />
            <span>to a clear direction.</span>
          </h2>

          <div className="features-heading-line" />
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article
              className="step-card"
              key={step.number}
            >
              <span className="step-number">
                {step.number}
              </span>

              <div className="step-line" />

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="careers"
        className="career-paths-section"
      >
        <div className="career-section-inner">
          <div className="career-section-copy">
            <p className="career-eyebrow">
              EXPLORE CAREER PATHS
            </p>

            <h2>
              Turn your skills
              <br />
              into a <span>career direction.</span>
            </h2>

            <p>
              SkillBridge helps you understand which skills
              to build next and gives you a structured path
              to keep moving forward.
            </p>
          </div>

          <div className="career-path-list">
            {careerPaths.map((career, index) => (
              <article
                className="career-path-card"
                key={career.title}
              >
                <div className="career-path-number">
                  0{index + 1}
                </div>

                <div className="career-path-content">
                  <h3>{career.title}</h3>

                  <p>{career.description}</p>

                  <span>{career.skills}</span>
                </div>

                <div className="career-path-arrow">
                  →
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="home-about-section"
      >
        <div className="home-about-card">
          <div>
            <p>ABOUT SKILLBRIDGE</p>

            <h2>
              One place to understand,
              <br />
              learn, and grow.
            </h2>
          </div>

          <p>
            SkillBridge AI brings career exploration,
            skill assessment, personalized learning,
            and progress tracking together in one
            student-focused platform.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default Home