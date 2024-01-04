import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.items.findIndex(
        (course) => course.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      const itemIndex: number = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex === -1) {
        return;
      }

      state.items.splice(itemIndex, 1);
    },
  },
});

export const { addCourse, updateCourse, removeCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
