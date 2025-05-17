// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import surveyReducer from "./surveySlice";

export const store = configureStore({
  reducer: {
    surveys: surveyReducer,
  },
});

// Tipleri dışa aktar
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
