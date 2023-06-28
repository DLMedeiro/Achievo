// This file is for making http requests and sending the data back, and setting any data in local storage
import axios from 'axios'

const GOALS_URL = process.env.REACT_APP_URL_GOALS

// Create new goal
const createGoal = async (goalData: object, user: any) => {
  // token that is stored is only the token, and need to change to a Bearer token
  //   * Not able to access token without setting user to any
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  if (GOALS_URL) {
    const response = await axios.post(
      GOALS_URL + 'user/' + user._id,
      goalData,
      config,
    )

    return response.data
  }
}

// update goal
const updateGoal = async (goalData: any, user: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  const response = await axios.put(GOALS_URL + goalData.id, goalData, config)

  return response.data
}

// Get goal
const getGoal = async (id: string, user: any) => {
  // token that is stored is only the token, and need to change to a Bearer token
  //   * Not able to access token without setting user to any
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  const response = await axios.get(GOALS_URL + id, config)

  return response.data
}

// Get goals
const getGoals = async (user: {
  email: string
  name: string
  token: string
  _id: string
}) => {
  // token that is stored is only the token, and need to change to a Bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  if (GOALS_URL) {
    const response = await axios.get(GOALS_URL + 'user/' + user._id, config)
    console.log(response)

    return response.data
  }
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
  const response = await axios.put(
    GOALS_URL + 'progress/' + changeData.id,
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
  const response = await axios.delete(GOALS_URL + id, config)

  return response.data
}
const goalService = {
  createGoal,
  getGoal,
  getGoals,
  deleteGoal,
  updateGoal,
  updateProgress,
}
export default goalService
