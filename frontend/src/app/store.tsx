import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
import dataReducer from "../features/data/dataSlice";
import feedbackReducer from "../features/feedback/feedbackSlice";
import goalDetailReducer from "../features/goalDetails/goalDetailSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    data: dataReducer,
    feedback: feedbackReducer,
    goalDetails: goalDetailReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: authState}
export type AppDispatch = typeof store.dispatch;
