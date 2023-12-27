import React, { useMemo } from "react";
import CourseMenu from "../components/course/CourseMenu";
import Schedule from "../components/schedule/Schedule";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { courseToCourseEvent } from "../utils/courseUtils";
import Course from "../types/Course";
import { addCourse, removeCourse } from "../redux/plannerSlice";

const Planner = () => {
  const courses = useAppSelector((state) => state.planner.courses);
  const dispatch = useAppDispatch();
  const events = useMemo(
    () => courses.flatMap((course: Course) => courseToCourseEvent(course)),
    [courses]
  );

  const courseAddedHandler = (course: Course) => {
    dispatch(addCourse(course));
  };

  const courseRemovedHandler = (course: Course) => {
    dispatch(removeCourse(course.id));
  };

  return (
    <>
      <CourseMenu
        courses={courses}
        onCourseAdded={courseAddedHandler}
        onCourseRemoved={courseRemovedHandler}
      />
      <Schedule events={events} />
    </>
  );
};

export default Planner;
