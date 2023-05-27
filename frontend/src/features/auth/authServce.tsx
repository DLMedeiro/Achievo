// This file is for making http requests and sending the data back, and setting any data in local storage
import axios from 'axios'

const API_url = 'http://localhost:5000/api/users'
// Had to include full address, otherwise the request was being called on port 3000

// Register user
const register = async (userData: object) => {
  const response = await axios.post(API_url, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    // Includes token
  }
  return response.data
}
// Login user
const login = async (userData: object) => {
  const response = await axios.post(API_url + '/login', userData)
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
