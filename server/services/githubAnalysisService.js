const GITHUB_API = 'https://api.github.com'

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

async function githubRequest(url) {
  const response = await fetch(url, {
    headers: githubHeaders,
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('GitHub user not found.')
    }

    if (response.status === 403) {
      throw new Error(
        'GitHub API rate limit reached. Please try again later.'
      )
    }

    throw new Error(`GitHub API error: ${response.status}`)
  }

  return response.json()
}

function calculateProjectLevel(profile, repos) {
  const nonForkRepos = repos.filter((repo) => !repo.fork)

  const totalRepos = nonForkRepos.length

  const totalStars = nonForkRepos.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  )

  const totalForks = nonForkRepos.reduce(
    (sum, repo) => sum + (repo.forks_count || 0),
    0
  )

  const languages = [
    ...new Set(
      nonForkRepos
        .map((repo) => repo.language)
        .filter(Boolean)
    ),
  ]

  let score = 0

  // Number of public projects
  if (totalRepos >= 3) score += 20
  if (totalRepos >= 6) score += 15
  if (totalRepos >= 10) score += 15

  // GitHub stars
  if (totalStars >= 5) score += 10
  if (totalStars >= 20) score += 10

  // Forks
  if (totalForks >= 3) score += 5

  // Technology diversity
  if (languages.length >= 2) score += 10
  if (languages.length >= 4) score += 10

  // Followers as a small profile signal
  if ((profile.followers || 0) >= 10) score += 5

  if (score >= 75) {
    return {
      level: 'Advanced',
      score,
      description:
        'Your public GitHub profile shows strong project activity and technology diversity.',
    }
  }

  if (score >= 45) {
    return {
      level: 'Intermediate',
      score,
      description:
        'Your public GitHub profile shows consistent project work and developing technical breadth.',
    }
  }

  return {
    level: 'Beginner',
    score,
    description:
      'Your public GitHub profile shows an early-stage project portfolio with room to build more projects.',
  }
}

function generateProjectSuggestions(languages, repos) {
  const suggestions = []

  const languageSet = new Set(
    languages.map((language) => language.toLowerCase())
  )

  const repoText = repos
    .map(
      (repo) =>
        `${repo.name} ${repo.description || ''} ${
          repo.language || ''
        }`
    )
    .join(' ')
    .toLowerCase()

  if (
    languageSet.has('python') ||
    repoText.includes('machine learning') ||
    repoText.includes('data science')
  ) {
    suggestions.push({
      title: 'AI Career Recommendation System',
      description:
        'Build an AI-based system that recommends career paths based on skills, interests and project history.',
      technology: 'Python, Machine Learning, Pandas, Scikit-learn',
    })
  }

  if (
    languageSet.has('javascript') ||
    languageSet.has('typescript') ||
    languageSet.has('react')
  ) {
    suggestions.push({
      title: 'AI-Powered Developer Dashboard',
      description:
        'Create a dashboard that analyzes GitHub activity and presents developer skills, projects and progress.',
      technology: 'React, JavaScript, Node.js, REST API',
    })
  }

  if (languageSet.has('java')) {
    suggestions.push({
      title: 'Student Management System',
      description:
        'Build a complete student management application with authentication, database operations and reporting.',
      technology: 'Java, Spring Boot, MySQL',
    })
  }

  if (
    languageSet.has('sql') ||
    repoText.includes('database')
  ) {
    suggestions.push({
      title: 'Data Analytics Dashboard',
      description:
        'Build a dashboard that converts database records into useful charts, reports and insights.',
      technology: 'SQL, Python, Pandas, Power BI',
    })
  }

  // General suggestions if no specific technology was detected
  if (suggestions.length === 0) {
    suggestions.push(
      {
        title: 'Personal Portfolio Website',
        description:
          'Create a professional portfolio showing your projects, skills, education and achievements.',
        technology: 'HTML, CSS, JavaScript',
      },
      {
        title: 'Task Management Application',
        description:
          'Build a full-stack application for creating, updating and tracking personal tasks.',
        technology: 'React, Node.js, Express',
      },
      {
        title: 'AI Resume Analyzer',
        description:
          'Build a tool that analyzes resumes and identifies skills, missing keywords and suitable career roles.',
        technology: 'Python, NLP, Machine Learning',
      }
    )
  }

  return suggestions.slice(0, 3)
}

export async function analyzeGithubProfile(username) {
  const cleanUsername = username.trim()

  if (!cleanUsername) {
    throw new Error('GitHub username is required.')
  }

  const profile = await githubRequest(
    `${GITHUB_API}/users/${encodeURIComponent(cleanUsername)}`
  )

  const repos = await githubRequest(
    `${GITHUB_API}/users/${encodeURIComponent(
      cleanUsername
    )}/repos?per_page=100&sort=updated`
  )

  const nonForkRepos = repos.filter((repo) => !repo.fork)

  const languages = [
    ...new Set(
      nonForkRepos
        .map((repo) => repo.language)
        .filter(Boolean)
    ),
  ]

  const existingProjects = nonForkRepos.slice(0, 10).map((repo) => ({
    name: repo.name,
    description:
      repo.description || 'No project description available.',
    language: repo.language || 'Not specified',
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    url: repo.html_url,
    updatedAt: repo.updated_at,
  }))

  const projectLevel = calculateProjectLevel(
    profile,
    repos
  )

  const projectSuggestions = generateProjectSuggestions(
    languages,
    repos
  )

  return {
    profile: {
      username: profile.login,
      name: profile.name || profile.login,
      avatar: profile.avatar_url,
      bio: profile.bio || '',
      location: profile.location || '',
      publicRepos: profile.public_repos || 0,
      followers: profile.followers || 0,
      following: profile.following || 0,
      profileUrl: profile.html_url,
    },

    skills: languages,

    projectLevel,

    existingProjects,

    projectSuggestions,

    summary: {
      totalProjects: nonForkRepos.length,
      technologies: languages.length,
      totalStars: nonForkRepos.reduce(
        (sum, repo) =>
          sum + (repo.stargazers_count || 0),
        0
      ),
    },
  }
}