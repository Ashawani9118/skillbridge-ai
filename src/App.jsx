import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import CareerAnalysis from './pages/CareerAnalysis/CareerAnalysis'
import Skills from './pages/Skills/Skills'
import Roadmap from './pages/Roadmap/Roadmap'
import Progress from './pages/Progress/Progress'
import Settings from './pages/Settings/Setting.jsx'
import GitHubAnalysis from './pages/GitHubAnalysis/GitHubAnalysis'
import ResumeAnalysis from './pages/ResumeAnalysis/ResumeAnalysis'

import ProtectedRoute from './components/ProtectedRoute'
import { getUser } from './utils/auth'

function App() {
  useEffect(() => {
    const applyTheme = () => {
      const user = getUser()
      const appearance = user?.appearance || 'dark'

      document.body.classList.remove('dark-mode', 'light-mode')

      if (appearance === 'dark') {
        document.body.classList.add('dark-mode')
      } else if (appearance === 'system') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches

        document.body.classList.add(
          prefersDark ? 'dark-mode' : 'light-mode'
        )
      } else {
        document.body.classList.add('light-mode')
      }
    }

    applyTheme()

    const handleThemeChange = () => {
      applyTheme()
    }

    window.addEventListener(
      'skillbridge-theme-change',
      handleThemeChange
    )

    const mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )

    const handleSystemThemeChange = () => {
      const user = getUser()

      if (user?.appearance === 'system') {
        applyTheme()
      }
    }

    mediaQuery.addEventListener(
      'change',
      handleSystemThemeChange
    )

    return () => {
      window.removeEventListener(
        'skillbridge-theme-change',
        handleThemeChange
      )

      mediaQuery.removeEventListener(
        'change',
        handleSystemThemeChange
      )
    }
  }, [])

  return (
    <>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />


        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/career-analysis"
            element={<CareerAnalysis />}
          />

          <Route
            path="/github-analysis"
            element={<GitHubAnalysis />}
          />

          <Route
            path="/resume-analysis"
            element={<ResumeAnalysis />}
          />

          <Route
            path="/skills"
            element={<Skills />}
          />

          <Route
            path="/roadmap"
            element={<Roadmap />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>


        {/* Unknown Route */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  )
}

export default App