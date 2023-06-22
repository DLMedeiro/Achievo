// reducers and initial state pertaining to authentication

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import authService from './authServce'
// import { boolean } from 'zod'

// Get user from local storage
// Why?
const user = JSON.parse(localStorage.getItem('user')!)
// const user = () => {
//     if (JSON.parse(localStorage.getItem('user')) === null) {
//         return null
//     } else {
//         return JSON.parse(localStorage.getItem('user'))
//     }
// have to use parse, because localStorage only uses strings

interface authState {
  user: object | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string | undefined
}

const initialState: authState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register the user
// User gets passed in from the register page
// ThunkAPI -> use in try/catch
export const registerUser = createAsyncThunk(
  'auth/register',
  async (user: object, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      //   const message =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString()
      let message
      if (error) {
        message = error.toString()
      }

      return thunkAPI.rejectWithValue(message)
      // Message will be sent as a payload
    }
  },
)

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (user: object, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      //   const message =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString()
      let message
      if (error) {
        message = error.toString()
      }

      return thunkAPI.rejectWithValue(message)
      // Message will be sent as a payload
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// async values go into extraReducers
// reset: disaptched after forms are submitted, resets values back to initial state
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  //   "action.payload" => because data is also being returned
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<string | any>) => {
          // "action: PayloadAction<string | any>" => solved error but not sure this is correct
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        },
      )
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | any>) => {
        // "action: PayloadAction<string | any>" => solved error but not sure this is correct
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

// Have to export the reducers functions separately -> allows it to be brought into components to initiate the function
export const { reset } = authSlice.actions
export default authSlice.reducer
