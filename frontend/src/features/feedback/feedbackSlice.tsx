// reducers and initial state pertaining to authentication

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import feedbackService from "./feedbackService";

// Get user from local storage

export interface Feedback {
  _id: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
interface feedbackState {
  feedback: Feedback[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | undefined;
}

const initialState: feedbackState = {
  feedback: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Feedback
export const createFeedback = createAsyncThunk<
  { success: boolean },
  object,
  { state: RootState }
>("feedback/create", async (feedbackData, thunkAPI) => {
  // thunkAPI object has a getState method, used to get any thing from any part of state.  Using here to get auth state
  try {
    const state = thunkAPI.getState();

    return await feedbackService.createFeedback(feedbackData);
  } catch (error) {
    let message;
    if (error) {
      message = error.toString();
    }
  }
});

// async values go into extraReducers
// reset: disaptched after forms are submitted, resets values back to initial state
export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createFeedback.fulfilled,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          if (state.feedback) {
            state.feedback.push(action.payload);
            state.feedback = state.feedback;
          }
        }
      )
      .addCase(
        createFeedback.rejected,
        (state, action: PayloadAction<string | any>) => {
          // action = message
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

// Have to export the reducers functions separately -> allows it to be brought into components to initiate the function
export const { reset } = feedbackSlice.actions;
export default feedbackSlice.reducer;
