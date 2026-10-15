import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../../App.css'

import {
  logoutUser,
  updateUser,
  getUser,
} from '../../utils/auth'

import useAuth from '../../hooks/useAuth'
import Sidebar from '../../components/Sidebar'

function Settings() {
  const navigate = useNavigate()
  const { userName } = useAuth()

  /* =====================================================
     DEFAULT SETTINGS
  ===================================================== */

  const savedUser = getUser() || {}

  const defaultSettings = {
    name: userName || 'Student',
    email: 'student@example.com',
    level: 'beginner',
    appearance: 'light',
    careerRecommendations: true,
    learningReminders: true,
    weeklyProgress: true,
  }

  const [settings, setSettings] = useState({
    ...defaultSettings,
    ...savedUser,
  })

  const [saved, setSaved] = useState(false)


  /* =====================================================
     UPDATE SETTING
  ===================================================== */

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }


  /* =====================================================
     APPLY THEME
  ===================================================== */

  const applyTheme = (appearance) => {
    document.body.classList.remove(
      'dark-mode',
      'light-mode'
    )

    if (appearance === 'dark') {
      document.body.classList.add('dark-mode')
      return
    }

    if (appearance === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      document.body.classList.add(
        prefersDark
          ? 'dark-mode'
          : 'light-mode'
      )

      return
    }

    document.body.classList.add('light-mode')
  }


  /* =====================================================
     SAVE SETTINGS
  ===================================================== */

  const handleSave = () => {
    updateUser({
      name: settings.name,
      email: settings.email,
      level: settings.level,
      appearance: settings.appearance,
      careerRecommendations:
        settings.careerRecommendations,
      learningReminders:
        settings.learningReminders,
      weeklyProgress:
        settings.weeklyProgress,
    })

    applyTheme(settings.appearance)

    window.dispatchEvent(
      new Event('skillbridge-theme-change')
    )

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }


  /* =====================================================
     RESET SETTINGS
  ===================================================== */

  const handleReset = () => {
    const currentUser = getUser() || {}

    const resetSettings = {
      ...defaultSettings,
      ...currentUser,
    }

    setSettings(resetSettings)

    applyTheme(
      resetSettings.appearance || 'light'
    )

    window.dispatchEvent(
      new Event('skillbridge-theme-change')
    )

    setSaved(false)
  }


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    logoutUser()

    document.body.classList.remove(
      'dark-mode',
      'light-mode'
    )

    document.body.classList.add(
      'light-mode'
    )

    navigate('/')
  }


  return (
    <div className="settings-page">

      {/* =================================================
          COMMON SIDEBAR
      ================================================= */}

      <Sidebar />


      {/* =================================================
          MAIN SETTINGS CONTENT
      ================================================= */}

      <main className="settings-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="settings-header">

          <p className="small-heading">
            ACCOUNT SETTINGS
          </p>

          <h1>
            Settings
          </h1>

          <p>
            Manage your profile, preferences and
            SkillBridge experience.
          </p>

        </header>


        {/* =================================================
            PROFILE
        ================================================= */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div>

              <span>
                👤
              </span>

              <div>

                <h2>
                  Profile
                </h2>

                <p>
                  Update your personal learning
                  information.
                </p>

              </div>

            </div>

          </div>


          <div className="settings-form">

            <div className="settings-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={settings.name}
                onChange={(e) =>
                  updateSetting(
                    'name',
                    e.target.value
                  )
                }
                placeholder="Enter your name"
              />

            </div>


            <div className="settings-field">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  updateSetting(
                    'email',
                    e.target.value
                  )
                }
                placeholder="Enter your email"
              />

            </div>


            <div className="settings-field">

              <label>
                Learning Level
              </label>

              <select
                value={settings.level}
                onChange={(e) =>
                  updateSetting(
                    'level',
                    e.target.value
                  )
                }
              >

                <option value="beginner">
                  Beginner
                </option>

                <option value="intermediate">
                  Intermediate
                </option>

                <option value="advanced">
                  Advanced
                </option>

              </select>

            </div>

          </div>

        </section>


        {/* =================================================
            APPEARANCE
        ================================================= */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div>

              <span>
                🎨
              </span>

              <div>

                <h2>
                  Appearance
                </h2>

                <p>
                  Choose how SkillBridge looks
                  for you.
                </p>

              </div>

            </div>

          </div>


          <div className="appearance-options">

            <button
              type="button"
              className={`appearance-option ${
                settings.appearance === 'light'
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                updateSetting(
                  'appearance',
                  'light'
                )

                applyTheme('light')
              }}
            >

              <span className="appearance-icon">
                ☀️
              </span>

              <span>

                <strong>
                  Light
                </strong>

                <small>
                  Clean and bright
                </small>

              </span>

            </button>


            <button
              type="button"
              className={`appearance-option ${
                settings.appearance === 'dark'
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                updateSetting(
                  'appearance',
                  'dark'
                )

                applyTheme('dark')
              }}
            >

              <span className="appearance-icon">
                🌙
              </span>

              <span>

                <strong>
                  Dark
                </strong>

                <small>
                  Easy on the eyes
                </small>

              </span>

            </button>


            <button
              type="button"
              className={`appearance-option ${
                settings.appearance === 'system'
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                updateSetting(
                  'appearance',
                  'system'
                )

                applyTheme('system')
              }}
            >

              <span className="appearance-icon">
                💻
              </span>

              <span>

                <strong>
                  System
                </strong>

                <small>
                  Follow device settings
                </small>

              </span>

            </button>

          </div>

        </section>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div>

              <span>
                🔔
              </span>

              <div>

                <h2>
                  Notifications
                </h2>

                <p>
                  Control the updates you
                  receive from SkillBridge.
                </p>

              </div>

            </div>

          </div>


          <div className="settings-option">

            <div>

              <strong>
                AI Career Recommendations
              </strong>

              <p>
                Receive personalized career
                suggestions based on your skills.
              </p>

            </div>


            <label className="settings-toggle">

              <input
                type="checkbox"
                checked={
                  settings.careerRecommendations
                }
                onChange={(e) =>
                  updateSetting(
                    'careerRecommendations',
                    e.target.checked
                  )
                }
              />

              <span></span>

            </label>

          </div>


          <div className="settings-option">

            <div>

              <strong>
                Learning Reminders
              </strong>

              <p>
                Get reminders to continue your
                learning journey.
              </p>

            </div>


            <label className="settings-toggle">

              <input
                type="checkbox"
                checked={
                  settings.learningReminders
                }
                onChange={(e) =>
                  updateSetting(
                    'learningReminders',
                    e.target.checked
                  )
                }
              />

              <span></span>

            </label>

          </div>


          <div className="settings-option">

            <div>

              <strong>
                Weekly Progress Report
              </strong>

              <p>
                Receive a weekly summary of your
                learning progress.
              </p>

            </div>


            <label className="settings-toggle">

              <input
                type="checkbox"
                checked={
                  settings.weeklyProgress
                }
                onChange={(e) =>
                  updateSetting(
                    'weeklyProgress',
                    e.target.checked
                  )
                }
              />

              <span></span>

            </label>

          </div>

        </section>


        {/* =================================================
            SECURITY
        ================================================= */}

        <section className="settings-card">

          <div className="settings-card-heading">

            <div>

              <span>
                🔐
              </span>

              <div>

                <h2>
                  Security
                </h2>

                <p>
                  Manage your account security.
                </p>

              </div>

            </div>

          </div>


          <div className="settings-security">

            <div>

              <strong>
                Password
              </strong>

              <p>
                Keep your account secure with
                a strong password.
              </p>

            </div>


            <button
              type="button"
              className="outline-button"
              onClick={() =>
                alert(
                  'Password change will be available soon.'
                )
              }
            >
              Change Password
            </button>

          </div>


          <div className="security-status">

            <span>
              🛡️
            </span>

            <div>

              <strong>
                Account Security
              </strong>

              <p>
                Your SkillBridge account is
                currently protected.
              </p>

            </div>

            <span className="security-active">
              Active
            </span>

          </div>

        </section>


        {/* =================================================
            SAVE / RESET ACTIONS
        ================================================= */}

        <div className="settings-actions">

          <div className="settings-save-row">

            <button
              type="button"
              className="primary-btn"
              onClick={handleSave}
            >
              💾 Save Settings
            </button>


            {saved && (
              <span className="settings-saved">
                ✓ Settings saved successfully
              </span>
            )}

          </div>


          <button
            type="button"
            className="reset-settings-button"
            onClick={handleReset}
          >
            🔄 Reset
          </button>

        </div>


        {/* =================================================
            SIGN OUT
        ================================================= */}

        <section className="settings-card settings-danger">

          <div>

            <h2>
              Sign Out
            </h2>

            <p>
              Sign out from your current
              SkillBridge account.
            </p>

          </div>


          <button
            type="button"
            className="logout-settings-button"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </section>


        {/* =================================================
            BACK TO DASHBOARD
        ================================================= */}

        <button
          type="button"
          className="outline-button settings-back"
          onClick={() =>
            navigate('/dashboard')
          }
        >
          ← Back to Dashboard
        </button>

      </main>

    </div>
  )
}

export default Settings