import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import goalDetailService from "./goalDetailService";

export interface GoalDetail {
  _id: string;
  goal: string;
  progressChange: Number;
  detail: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
interface goalDetailState {
  details: GoalDetail[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | undefined;
}

const initialState: goalDetailState = {
  details: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all details for a goal
export const getGoalDetails = createAsyncThunk<
  { success: boolean },
  string,
  { state: RootState }
>("goalDetails/getAll", async (goalId, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    if (state.auth.user) {
      const user = state.auth.user;
      // const token = user.token
      return await goalDetailService.getGoalDetails(user, goalId);
    }
  } catch (error) {
    let message;
    if (error) {
      message = error.toString();
    }
  }
});

// Get single user goal
export const getSingleDetail = createAsyncThunk<
  { success: boolean },
  string,
  { state: RootState }
>("goals/", async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    if (state.auth.user) {
      const user = state.auth.user;
      // const token = user.token
      return await goalDetailService.getSingleGoalDetail(id, user);
    }
  } catch (error) {
    let message;
    if (error) {
      message = error.toString();
    }
  }
});

// Create New Goal detail
export const createGoalDetail = createAsyncThunk<
  { success: boolean },
  object,
  { state: RootState }
>("goalDetail/create", async (goalData, thunkAPI) => {
  try {
    const state = thunkAPI.getState();

    if (state.auth.user) {
      const user = state.auth.user;
      return await goalDetailService.createGoalDetails(goalData, user);
    }
  } catch (error) {
    let message;
    if (error) {
      message = error.toString();
    }
  }
});

export const goalDetailSlice = createSlice({
  name: "goalDetail",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getGoalDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getGoalDetails.fulfilled,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          if (state.details) {
            state.details = action.payload;
          }
        }
      )
      .addCase(
        getGoalDetails.rejected,
        (state, action: PayloadAction<string | any>) => {
          // action = message
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(getSingleDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSingleDetail.fulfilled,
        (state, action: PayloadAction<object | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          if (state.details) {
            state.details = [action.payload];
          }
        }
      )
      .addCase(
        getSingleDetail.rejected,
        (state, action: PayloadAction<string | any>) => {
          // action = message
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(createGoalDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createGoalDetail.fulfilled,
        (state, action: PayloadAction<string | any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          if (state.details) {
            state.details.push(action.payload);
            state.details = state.details;
          }
        }
      )
      .addCase(
        createGoalDetail.rejected,
        (state, action: PayloadAction<string | any>) => {
          // action = message
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export const { reset } = goalDetailSlice.actions;
export default goalDetailSlice.reducer;
