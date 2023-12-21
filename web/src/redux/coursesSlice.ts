import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Course from "../types/Course";
import testCourses from "../data/courses";

export interface CoursesState {
  items: Array<Course>;
  status: "idle" | "loading" | "failed";
}

const initialState: CoursesState = {
  items: [...testCourses],
  status: "idle",
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
