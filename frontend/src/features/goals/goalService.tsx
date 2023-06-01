// This file is for making http requests and sending the data back, and setting any data in local storage
import axios from 'axios'

const API_url = 'http://localhost:5000/api/goals/'
// Had to include full address, otherwise the request was being called on port 3000

// Create new goal
const createGoal = async (goalData: object, user: any) => {
  // token that is stored is only the token, and need to change to a Bearer token
  //   * Not able to access token without setting user to any
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  const response = await axios.post(API_url, goalData, config)

  return response.data
}
// Get goals
const getGoals = async (user: any) => {
  // token that is stored is only the token, and need to change to a Bearer token
  //   * Not able to access token without setting user to any
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  const response = await axios.get(API_url, config)

  return response.data
}

// Update Progress
const updateProgress = async (changeData: any, user: any) => {
  // token that is stored is only the token, and need to change to a Bearer token
  //   * Not able to access token without setting user to any
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  console.log(changeData.change)
  const response = await axios.put(
    API_url + 'progress/' + changeData.id,
    changeData,
    config,
  )
  return response.data
}

// Delete goal

const deleteGoal = async (id: string, user: any) => {
  // token that is stored is only the token, and need to change to a Bearer token
  //   * Not able to access token without setting user to any
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  const response = await axios.delete(API_url + id, config)

  return response.data
}
const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateProgress,
}
export default goalService
