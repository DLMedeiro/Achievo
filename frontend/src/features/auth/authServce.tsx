// This file is for making http requests and sending the data back, and setting any data in local storage
import axios from 'axios'

const USERS_URL = process.env.REACT_APP_URL_USERS
// const USERS_URL = 'http://localhost:5000/api/users'

// Register user
const register = async (userData: object) => {
  if (USERS_URL) {
    const response = await axios.post(USERS_URL, userData)

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      // Includes token
    }
    return response.data
  }
}
// Login user
const login = async (userData: object) => {
  const response = await axios.post(USERS_URL + '/login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    // Includes token
  }
  return response.data
}

// Logout a user
const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
