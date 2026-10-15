import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUser } from '../utils/auth'

function Icon({ name }) {
  const commonProps = {
    width: 19,
    height: 19,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'dashboard':
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )

    case 'skills':
      return (
        <svg {...commonProps}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
          <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16z" />
        </svg>
      )

    case 'roadmap':
      return (
        <svg {...commonProps}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 6H14a4 4 0 014 4v5.5" />
          <path d="M15.5 18H10a4 4 0 01-4-4V8.5" />
        </svg>
      )

    case 'career':
      return (
        <svg {...commonProps}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          <path d="M3 12h18" />
          <path d="M10 12v2h4v-2" />
        </svg>
      )

    case 'github':
      return (
        <svg {...commonProps}>
          <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0019.3 4 5.1 5.1 0 0019.2.8S17.8.4 15 2.3a13 13 0 00-6 0C6.2.4 4.8.8 4.8.8A5.1 5.1 0 004.7 4 5.5 5.5 0 003.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 009 18v4" />
          <path d="M9 18c-2.3 1-4-1-4-1" />
        </svg>
      )

    case 'resume':
      return (
        <svg {...commonProps}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      )

    case 'progress':
      return (
        <svg {...commonProps}>
          <path d="M4 19V9" />
          <path d="M10 19V5" />
          <path d="M16 19v-8" />
          <path d="M22 19V3" />
        </svg>
      )

    case 'settings':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V20h-2.6v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 007 15a1.7 1.7 0 00-1.5-1H5.4v-2.6h.1A1.7 1.7 0 007 10a1.7 1.7 0 00-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 001.9.3 1.7 1.7 0 001-1.5V5H14v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 00-.3 1.9 1.7 1.7 0 001.5 1h.1v2.6h-.1a1.7 1.7 0 00-1.5 1z" />
        </svg>
      )

    case 'logout':
      return (
        <svg {...commonProps}>
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M21 19V5a2 2 0 00-2-2h-5" />
        </svg>
      )

    default:
      return null
  }
}

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()

    document.body.classList.remove(
      'dark-mode',
      'light-mode'
    )

    document.body.classList.add('light-mode')

    navigate('/')
  }

  const links = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      to: '/skills',
      label: 'My Skills',
      icon: 'skills',
    },
    {
      to: '/roadmap',
      label: 'Learning Roadmap',
      icon: 'roadmap',
    },
    {
      to: '/career-analysis',
      label: 'Career',
      icon: 'career',
    },
    {
      to: '/github-analysis',
      label: 'GitHub Analysis',
      icon: 'github',
    },
    {
      to: '/resume-analysis',
      label: 'Resume Analysis',
      icon: 'resume',
    },
    {
      to: '/progress',
      label: 'Progress',
      icon: 'progress',
    },
  ]

  return (
    <aside className="dashboard-sidebar shared-sidebar">

      <div className="dashboard-logo">
        Skill<span>Bridge</span>
      </div>

      <nav className="dashboard-nav">

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            <span className="sidebar-icon">
              <Icon name={link.icon} />
            </span>

            <span className="sidebar-label">
              {link.label}
            </span>
          </NavLink>
        ))}

      </nav>

      <div className="sidebar-bottom">

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          <span className="sidebar-icon">
            <Icon name="settings" />
          </span>

          <span className="sidebar-label">
            Settings
          </span>
        </NavLink>

        <button
          type="button"
          className="logout-link"
          onClick={handleLogout}
        >
          <span className="sidebar-icon">
            <Icon name="logout" />
          </span>

          <span className="sidebar-label">
            Logout
          </span>
        </button>

      </div>

    </aside>
  )
}

export default Sidebar