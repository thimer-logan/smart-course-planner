import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Course from "../types/Course";
import testCourses from "../data/courses";
import { fetchPlans } from "../utils/apiUtils";
import Schedule from "../types/Schedule";
import { parseSchedules } from "../utils/scheduleUtils";

export interface PlannerState {
  courses: Array<Course>;
  schedules: Array<Schedule>;
  status: "idle" | "loading" | "failed";
}

const initialState: PlannerState = {
  courses: [...testCourses],
  schedules: [],
  status: "idle",
};

export const planCoursesAsync = createAsyncThunk(
  "planner/fetchPlans",
  async (courses: Array<Course>, thunkAPI) => {
    try {
      const res = await fetchPlans(courses);
      const data: string[][] = await res.json();

      const { planner } = thunkAPI.getState() as {
        planner: PlannerState;
      };

      const schedules: Schedule[] = parseSchedules(data, [...planner.courses]);
      console.log("Parsed the schedules");
      console.log(schedules);

      return schedules;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      );

      if (index !== -1) {
        state.courses[index] = action.payload;
      }
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
  extraReducers: (builder) => {
    builder
      .addCase(planCoursesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(planCoursesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.schedules = action.payload;
      })
      .addCase(planCoursesAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addCourse, updateCourse, removeCourse } = plannerSlice.actions;

export default plannerSlice.reducer;
