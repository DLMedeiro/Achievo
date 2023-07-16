import type { RootState } from '../../app/store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import dataService from './dataService'

const initialState= {}

// Get user goals
export const getData = createAsyncThunk<
  { success: boolean },
  void,
  { state: RootState }
>('users/getAll', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const data = await dataService.getUsers;
    return { success: true };
  } catch (error) {
    let message;
    if (error) {
      message = error.toString();
      // Handle the error, e.g., dispatch an action or log the error
      console.error(message);
    }
    return { success: false };
  }
});
// "Use "_" if not passing in anything, but want the thinkAPI access

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(getData.pending, (state) => {
    //       state.isLoading = true
    //     })
    //     .addCase(
    //       getData.fulfilled,
    //       (state, action: PayloadAction<string | any>) => {
    //         state.isLoading = false
    //         state.isSuccess = true
    //         if (state.goals) {
    //           state.goals.push(action.payload)
    //           state.goals = state.goals
    //         }
    //       },
    //     )
    //     .addCase(
    //       getData.rejected,
    //       (state, action: PayloadAction<string | any>) => {
    //         // action = message
    //         state.isLoading = false
    //         state.isError = true
    //         state.message = action.payload
    //       },
    //     )
})


export default dataSlice.reducer