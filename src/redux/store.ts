import { configureStore } from "@reduxjs/toolkit";
import surveyReducer from "./surveySlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    surveys: surveyReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
