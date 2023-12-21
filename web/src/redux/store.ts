import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./coursesSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
