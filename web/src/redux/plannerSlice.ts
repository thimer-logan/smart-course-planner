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
    removeCourse: (state, action: PayloadAction<string>) => {
      const itemIndex: number = state.courses.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex === -1) {
        return;
      }

      state.courses.splice(itemIndex, 1);
    },
  },
});

export const { addCourse, removeCourse } = plannerSlice.actions;

export default plannerSlice.reducer;
