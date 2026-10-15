import express from 'express'
import { analyzeGithubProfile } from '../services/githubAnalysisService.js'

const router = express.Router()

router.get('/analyze/:username', async (req, res) => {
  try {
    const { username } = req.params

    const result = await analyzeGithubProfile(username)

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('GitHub Analysis Error:', error)

    res.status(500).json({
      success: false,
      message: error.message || 'GitHub analysis failed.',
    })
  }
})

export default router