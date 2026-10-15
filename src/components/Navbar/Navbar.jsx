import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        Skill<span>Bridge</span>
      </Link>

      <nav
        className={`nav-links ${
          menuOpen ? 'nav-links-open' : ''
        }`}
      >
        <a
          href="#features"
          onClick={closeMenu}
        >
          Features
        </a>

        <a
          href="#how-it-works"
          onClick={closeMenu}
        >
          How It Works
        </a>

        <a
          href="#careers"
          onClick={closeMenu}
        >
          Careers
        </a>
      </nav>

      <div className="nav-buttons">
        <Link
          to="/login"
          className="login-btn"
          onClick={closeMenu}
        >
          Log In
        </Link>

        <Link
          to="/signup"
          className="signup-btn"
          onClick={closeMenu}
        >
          Get Started
        </Link>
      </div>

      <button
        type="button"
        className={`mobile-menu-btn ${
          menuOpen ? 'menu-open' : ''
        }`}
        onClick={() =>
          setMenuOpen((current) => !current)
        }
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  )
}

export default Navbar