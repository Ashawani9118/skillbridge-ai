import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { analyzeResume } from '../resumeAnalysisService.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, '../uploads/resumes')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()

    const safeName = `resume-${Date.now()}${extension}`

    cb(null, safeName)
  },
})

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ]

    const allowedExtensions = ['.pdf', '.docx', '.txt']

    const extension = path.extname(file.originalname).toLowerCase()

    if (
      allowedTypes.includes(file.mimetype) &&
      allowedExtensions.includes(extension)
    ) {
      cb(null, true)
    } else {
      cb(
        new Error(
          'Only PDF, DOCX and TXT resume files are allowed.'
        )
      )
    }
  },
})

router.post('/analyze', upload.single('resume'), async (req, res) => {
  let uploadedFilePath = null

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file.',
      })
    }

    uploadedFilePath = req.file.path

    const analysis = await analyzeResume(uploadedFilePath)

    return res.json({
      success: true,

      file: {
        originalName: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
      },

      analysis,
    })
  } catch (error) {
    console.error('Resume analysis error:', error)

    return res.status(500).json({
      success: false,
      message:
        error.message || 'Failed to analyze the uploaded resume.',
    })
  } finally {
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      fs.unlinkSync(uploadedFilePath)
    }
  }
})

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }

  return res.status(400).json({
    success: false,
    message:
      error.message || 'Resume upload failed.',
  })
})

export default router