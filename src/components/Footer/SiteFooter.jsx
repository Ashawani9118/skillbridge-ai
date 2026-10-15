import { Link } from 'react-router-dom'

function SiteFooter() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Skill<span>Bridge</span>
          </Link>

          <p>
            AI-powered learning and career guidance
            for the next generation of students.
          </p>

          <div className="footer-badge">
            ✦ Built for ambitious learners
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-link-group">
            <h4>Platform</h4>

            <button
              type="button"
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
            >
              How It Works
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('careers')}
            >
              Careers
            </button>
          </div>

          <div className="footer-link-group">
            <h4>Company</h4>

            <button
              type="button"
              onClick={() => scrollToSection('about')}
            >
              About SkillBridge
            </button>

            <Link to="/login">
              Log In
            </Link>

            <Link to="/signup">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 SkillBridge AI. All rights reserved.
        </p>

        <p>
          Built with <span>♥</span> for learners.
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
