// src/redux/surveySlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Survey = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  answeredBy?: string;
  answeredAt?: string;
};

interface SurveyState {
  list: Survey[];
}

const initialState: SurveyState = {
  list: [],
};

export const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    addSurvey: (state, action: PayloadAction<Survey>) => {
      state.list.push(action.payload);
    },
    updateSurvey: (state, action: PayloadAction<Survey>) => {
      const index = state.list.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteSurvey: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSurvey, updateSurvey, deleteSurvey } = surveySlice.actions;

export default surveySlice.reducer;
