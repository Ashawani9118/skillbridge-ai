import express from 'express'
import cors from 'cors'
import session from 'express-session'
import 'dotenv/config'
import process from 'node:process'
import githubAnalysisRouter from './routes/githubAnalysis.js'
import resumeAnalysisRouter from './routes/resumeAnalysis.js'

const app = express()

const PORT = process.env.PORT || 5000

// =========================
// CORS
// =========================

app.use(
  cors({
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:5174',
      'http://localhost:5174',
    ],
    credentials: true,
  })
)

app.use(express.json())

// =========================
// GITHUB ANALYSIS ROUTES
// =========================

app.use('/api/github', githubAnalysisRouter)

// =========================
// RESUME ANALYSIS ROUTES
// =========================

app.use('/api/resume', resumeAnalysisRouter)

// =========================
// SESSION
// =========================

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'skillbridge-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    },
  })
)

// =========================
// HOME / TEST
// =========================

app.get('/', (req, res) => {
  res.json({
    message: 'SkillBridge AI backend is running 🚀',
  })
})

// =========================
// GITHUB LOGIN
// =========================

app.get('/auth/github', (req, res) => {
  const githubAuthUrl =
    'https://github.com/login/oauth/authorize' +
    `?client_id=${encodeURIComponent(
      process.env.GITHUB_CLIENT_ID
    )}` +
    `&redirect_uri=${encodeURIComponent(
      process.env.GITHUB_CALLBACK_URL
    )}` +
    '&scope=read:user%20user:email'

  res.redirect(githubAuthUrl)
})

// =========================
// GITHUB CALLBACK
// =========================

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query

  if (!code) {
    return res.redirect(
      'http://127.0.0.1:5173/login?github=error'
    )
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: process.env.GITHUB_CALLBACK_URL,
        }),
      }
    )

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      console.error('GitHub token error:', tokenData)

      return res.redirect(
        'http://127.0.0.1:5173/login?github=error'
      )
    }

    // Get GitHub profile
    const userResponse = await fetch(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    const githubUser = await userResponse.json()

    // Save required information in server session
    req.session.githubUser = {
      id: githubUser.id,
      login: githubUser.login,
      name: githubUser.name,
      email: githubUser.email,
      avatar_url: githubUser.avatar_url,
      public_repos: githubUser.public_repos,
      followers: githubUser.followers,
      following: githubUser.following,
    }

    req.session.githubAccessToken = tokenData.access_token

    // Redirect back to React
    res.redirect(
      'http://127.0.0.1:5173/login?github=success'
    )
  } catch (error) {
    console.error('GitHub OAuth error:', error)

    res.redirect(
      'http://127.0.0.1:5173/login?github=error'
    )
  }
})

// =========================
// GET GITHUB USER
// =========================

app.get('/api/github/me', (req, res) => {
  if (!req.session.githubUser) {
    return res.status(401).json({
      message: 'GitHub user is not authenticated.',
    })
  }

  res.json(req.session.githubUser)
})

// =========================
// LOGOUT GITHUB SESSION
// =========================

app.post('/api/github/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({
      success: true,
    })
  })
})

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `SkillBridge AI backend running on http://127.0.0.1:${PORT}`
  )
})