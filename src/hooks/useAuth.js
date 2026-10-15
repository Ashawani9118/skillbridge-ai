import { useState, useEffect } from 'react'
import { getUser, isLoggedIn } from '../utils/auth'

function useAuth() {
  const [user, setUser] = useState(getUser())
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  useEffect(() => {
    const syncUser = () => {
      setUser(getUser())
      setLoggedIn(isLoggedIn())
    }

    window.addEventListener('storage', syncUser)
    window.addEventListener('userUpdated', syncUser)

    return () => {
      window.removeEventListener('storage', syncUser)
      window.removeEventListener('userUpdated', syncUser)
    }
  }, [])

  return {
    user,
    isLoggedIn: loggedIn,
    userName: user?.name || 'User',
    email: user?.email || '',
  }
}

export default useAuth