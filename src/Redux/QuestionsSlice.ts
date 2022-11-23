import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./Store";

interface CounterState {
  questions: Question[];
}
export interface Question {
  title: string;
  tags: string[];
  companies: string[];
  positions: string[];
}

const initialState: CounterState = {
  questions: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
  },
});

export const { addQuestions } = questionsSlice.actions;

export const selectCount = (state: RootState) => state.questions;

export default questionsSlice.reducer;
