import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../../App.css'
import { getUser, loginUser } from '../../utils/auth'

function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [error, setError] = useState(() =>
    searchParams.get('github') === 'error'
      ? 'GitHub login failed. Please try again.'
      : ''
  )
  const [loading, setLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const githubStatus = searchParams.get('github')

    if (githubStatus === 'success') {
      navigate('/dashboard', { replace: true })
    }
  }, [searchParams, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const email = e.target.email.value.trim()
    const password = e.target.password.value

    const savedUser = getUser()

    if (!savedUser) {
      setError(
        'No account found. Please create an account first.'
      )
      setLoading(false)
      return
    }

    if (
      savedUser.email?.toLowerCase() !==
      email.toLowerCase()
    ) {
      setError('Incorrect email address.')
      setLoading(false)
      return
    }

    if (savedUser.password !== password) {
      setError('Incorrect password.')
      setLoading(false)
      return
    }

    loginUser()

    setTimeout(() => {
      navigate('/dashboard')
    }, 300)
  }

  const handleGithubLogin = () => {
    setError('')
    setGithubLoading(true)

    window.location.href =
      'http://127.0.0.1:5000/auth/github'
  }

  return (
    <div className="auth-page">

      <div className="auth-shell">

        {/* =========================
            LEFT BRAND PANEL
        ========================= */}

        <section className="auth-brand-panel">

          <div className="auth-brand-logo">
            Skill<span>Bridge</span>
          </div>

          <div className="auth-brand-content">

            <div className="auth-brand-badge">
              AI-Powered Career Platform
            </div>

            <h2>
              Build skills.
              <br />
              <span>Build your future.</span>
            </h2>

            <p>
              Analyze your skills, discover career paths,
              track your progress and build projects that
              move your career forward.
            </p>

            <div className="auth-feature-list">

              <div className="auth-feature">
                <div className="auth-feature-icon">✦</div>
                <div>
                  <strong>AI Career Analysis</strong>
                  <span>Find the right career path for you.</span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">◈</div>
                <div>
                  <strong>Personalized Roadmap</strong>
                  <span>Know exactly what to learn next.</span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">⌘</div>
                <div>
                  <strong>GitHub Analysis</strong>
                  <span>Turn your projects into career insights.</span>
                </div>
              </div>

            </div>

          </div>

          <div className="auth-brand-footer">
            © 2026 SkillBridge AI
          </div>

        </section>


        {/* =========================
            LOGIN PANEL
        ========================= */}

        <section className="auth-login-panel">

          <div className="auth-card">

            <div className="auth-mobile-logo">
              Skill<span>Bridge</span>
            </div>

            <div className="auth-heading">

              <div className="auth-welcome-label">
                Welcome back
              </div>

              <h1>Sign in to SkillBridge</h1>

              <p>
                Continue your journey towards your dream career.
              </p>

            </div>


            {/* =========================
                GITHUB LOGIN
            ========================= */}

            <button
              type="button"
              className="github-login-button"
              onClick={handleGithubLogin}
              disabled={githubLoading || loading}
            >

              <span className="github-icon">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.18v3.23c0 .3.21.66.79.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                  />
                </svg>
              </span>

              <span>
                {githubLoading
                  ? 'Connecting to GitHub...'
                  : 'Continue with GitHub'}
              </span>

            </button>


            {/* =========================
                DIVIDER
            ========================= */}

            <div className="auth-divider">
              <span></span>
              <p>or continue with email</p>
              <span></span>
            </div>


            {/* =========================
                EMAIL LOGIN
            ========================= */}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              <div className="auth-field">

                <label htmlFor="email">
                  Email address
                </label>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    @
                  </span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />

                </div>

              </div>


              <div className="auth-field">

                <div className="auth-password-label">

                  <label htmlFor="password">
                    Password
                  </label>

                  <span className="auth-secure-text">
                    Secure login
                  </span>

                </div>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    •••
                  </span>

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? '◉' : '◌'}
                  </button>

                </div>

              </div>


              {/* ERROR */}

              {error && (
                <div
                  className="auth-error"
                  role="alert"
                >
                  <span className="auth-error-icon">
                    !
                  </span>

                  <span>{error}</span>
                </div>
              )}


              <button
                type="submit"
                className="auth-button"
                disabled={
                  loading || githubLoading
                }
              >

                <span>
                  {loading
                    ? 'Signing in...'
                    : 'Sign in'}
                </span>

                {!loading && (
                  <span className="auth-button-arrow">
                    →
                  </span>
                )}

              </button>

            </form>


            <div className="auth-security-note">
              <span>🔒</span>
              <span>
                Your account information is securely stored.
              </span>
            </div>


            <p className="auth-switch">
              Don't have an account?

              <button
                type="button"
                className="auth-link-button"
                onClick={() =>
                  navigate('/signup')
                }
              >
                Create an account
              </button>

            </p>

          </div>

        </section>

      </div>

    </div>
  )
}

export default Login