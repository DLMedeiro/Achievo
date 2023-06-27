// reducers and initial state pertaining to authentication

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
// import goalService from './goalService'
import goalService from './goalService'
import { StringExpression } from 'mongoose'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user')!)
// const user = () => {
//     if (JSON.parse(localStorage.getItem('user')) === null) {
//         return null
//     } else {
//         return JSON.parse(localStorage.getItem('user'))
//     }
// have to use parse, because localStorage only uses strings

export interface Goal {
  _id: string
  user: string
  name: string
  start: Date
  end: Date
  timeAllotment: Number
  progress: Number
  createdAt: string
  updatedAt: string
  __v?: number
}
interface goalState {
  goals: Goal[] | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string | undefined
}

const initialState: goalState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create New Goal
// Issues accessing token from user, adding input from this video, and changed the user type to "any" within goalService https://egghead.io/lessons/react-accessing-global-state-inside-of-async-thunks-with-typescript
export const createGoal = createAsyncThunk<
  { success: boolean },
  object,
  { state: RootState }
>('goals/create', async (goalData, thunkAPI) => {
  // thunkAPI object has a getState method, used to get any thing from any part of state.  Using here to get auth state
  try {
    const state = thunkAPI.getState()

    if (state.auth.user) {
      const user = state.auth.user
      // const token = user.token
      return await goalService.createGoal(goalData, user)
      // getting token from user within goalService
    }
  } catch (error) {
    let message
    if (error) {
      message = error.toString()
    }
  }
})

// Get single user goal
export const getOneGoal = createAsyncThunk<
  { success: boolean },
  string,
  { state: RootState }
>('goals/', async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    if (state.auth.user) {
      const user = state.auth.user
      // const token = user.token
      return await goalService.getGoal(id, user)
    }
  } catch (error) {
    let message
    if (error) {
      message = error.toString()
    }
  }
})

// Get user goals
export const getGoals = createAsyncThunk<
  { success: boolean },
  object,
  { state: RootState }
>('goals/getAll', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    console.log(state.auth.user)
    if (state.auth.user) {
      const user = state.auth.user
      // const token = user.token
      return await goalService.getGoals(user)
    }
  } catch (error) {
    let message
    if (error) {
      message = error.toString()
    }
  }
})
// "Use "_" if not passing in anything, but want the thinkAPI access

// update goal
export const changeGoal = createAsyncThunk<
  { success: boolean },
  object,
  { state: RootState }
>('goals', async (goalData, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    if (state.auth.user) {
      const user = state.auth.user
      // const token = user.token
      return await goalService.updateGoal(goalData, user)
      // getting token from user within goalService
    }
  } catch (error) {
    let message
    if (error) {
      message = error.toString()
    }
  }
})

// update progress
// Incoming object = {id: #, change: "add" or "subtract"}
export const updateProgress = createAsyncThunk<
  { success: boolean },
  object,
  { state: RootState }
>('goals/progress', async (changeData, thunkAPI) => {
  // thunkAPI object has a getState method, used to get any thing from any part of state.  Using here to get auth state
  try {
    const state = thunkAPI.getState()
    if (state.auth.user) {
      const user = state.auth.user
      // const token = user.token
      return await goalService.updateProgress(changeData, user)
      // getting token from user within goalService
    }
  } catch (error) {
    let message
    if (error) {
      message = error.toString()
    }
  }
})

// Delete Goal
export const deleteGoal = createAsyncThunk<
  { success: boolean },
  string,
  { state: RootState }
>('goals/delete', async (id, thunkAPI) => {
  // thunkAPI object has a getState method, used to get any thing from any part of state.  Using here to get auth state
  try {
    const state = thunkAPI.getState()
    if (state.auth.user) {
      const user = state.auth.user
      // const token = user.token
      return await goalService.deleteGoal(id, user)
      // getting token from user within goalService
    }
  } catch (error) {
    let message
    if (error) {
      message = error.toString()
    }
  }
})

// async values go into extraReducers
// reset: disaptched after forms are submitted, resets values back to initial state
export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        createGoal.fulfilled,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false
          state.isSuccess = true
          if (state.goals) {
            state.goals.push(action.payload)
            state.goals = state.goals
          }
        },
      )
      .addCase(
        createGoal.rejected,
        (state, action: PayloadAction<string | any>) => {
          // action = message
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        },
      )
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getGoals.fulfilled,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false
          state.isSuccess = true
          if (state.goals) {
            state.goals = action.payload
          }
        },
      )
      .addCase(
        getGoals.rejected,
        (state, action: PayloadAction<string | any>) => {
          // action = message
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        },
      )
      .addCase(getOneGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getOneGoal.fulfilled,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false
          state.isSuccess = true
          if (state.goals) {
            state.goals = action.payload
          }
        },
      )
      .addCase(
        getOneGoal.rejected,
        (state, action: PayloadAction<string | any>) => {
          // action = message
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        },
      )
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        deleteGoal.fulfilled,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false
          state.isSuccess = true
          if (state.goals) {
            state.goals = state.goals.filter(
              (goal) => goal._id !== action.payload.id,
            )
            // This will take the goal out of the UI when deleted
            // action.payload.id = the goal being deleted
            // payload is coming from the response on the backend
          }
        },
      )
      .addCase(
        deleteGoal.rejected,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        },
      )
      .addCase(changeGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        changeGoal.fulfilled,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false
          state.isSuccess = true
          if (state.goals) {
            state.goals.map((goal) => {
              if (goal._id === action.payload.id) {
                return {
                  ...goal,
                  ...action.payload,
                }
              }
              return goal
            })
          }
        },
      )
      .addCase(
        changeGoal.rejected,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        },
      )
  },
})

// Have to export the reducers functions separately -> allows it to be brought into components to initiate the function
export const { reset } = goalSlice.actions
export default goalSlice.reducer
