import React, { useMemo } from "react";
import CourseMenu from "../components/course/CourseMenu";
import ScheduleLayout from "../components/schedule/ScheduleLayout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Course from "../types/Course";
import { addCourse, removeCourse, updateCourse } from "../redux/coursesSlice";
import { createSchedule } from "../utils/scheduleUtils";

const Home = () => {
  const courses = useAppSelector((state) => state.courses.items);
  const schedule = useMemo(() => createSchedule(courses), [courses]);
  const dispatch = useAppDispatch();

  const courseAddedHandler = (course: Course) => {
    dispatch(addCourse(course));
  };

  const courseChangedHandler = (course: Course) => {
    dispatch(updateCourse(course));
  };

  const courseRemovedHandler = (course: Course) => {
    dispatch(removeCourse(course.id));
  };

  return (
    <>
      <div className="flex flex-col">
        <CourseMenu
          courses={courses}
          onCourseAdded={courseAddedHandler}
          onCourseChanged={courseChangedHandler}
          onCourseRemoved={courseRemovedHandler}
        />
      </div>
      <div className="flex flex-row flex-grow">
        <ScheduleLayout schedules={[schedule]} />
      </div>
    </>
  );
};

export default Home;
