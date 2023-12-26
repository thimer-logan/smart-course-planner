import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Course from "../types/Course";
import testCourses from "../data/courses";

export interface PlannerState {
  courses: Array<Course>;
  status: "idle" | "loading" | "failed";
}

const initialState: PlannerState = {
  courses: [...testCourses],
  status: "idle",
};

export const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
  },
});

export const { addCourse } = plannerSlice.actions;

export default plannerSlice.reducer;
