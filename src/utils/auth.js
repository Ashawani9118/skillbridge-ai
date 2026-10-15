const USER_KEY = 'skillbridge_user'

const LOGIN_KEY = 'skillbridge_logged_in'


// Save user information

export function saveUser(user) {

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  )

  window.dispatchEvent(
    new Event('userUpdated')
  )
}


// Get saved user information

export function getUser() {

  const user = localStorage.getItem(USER_KEY)

  if (!user) {
    return null
  }

  return JSON.parse(user)
}


// Update existing user information

export function updateUser(updatedData) {

  const currentUser = getUser()

  const updatedUser = {
    ...currentUser,
    ...updatedData,
  }

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(updatedUser)
  )

  window.dispatchEvent(
    new Event('userUpdated')
  )

  return updatedUser
}


// Login

export function loginUser() {

  localStorage.setItem(
    LOGIN_KEY,
    'true'
  )
}


// Logout

export function logoutUser() {

  localStorage.removeItem(
    LOGIN_KEY
  )
}


// Check login status

export function isLoggedIn() {

  return localStorage.getItem(
    LOGIN_KEY
  ) === 'true'
}