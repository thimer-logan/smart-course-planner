import React, { useMemo } from "react";
import CourseMenu from "../components/course/CourseMenu";
import Schedule from "../components/schedule/Schedule";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { courseToCourseEvent } from "../utils/courseUtils";
import Course from "../types/Course";
import { addCourse, removeCourse, updateCourse } from "../redux/plannerSlice";

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

  const courseChangedHandler = (course: Course) => {
    dispatch(updateCourse(course));
  };

  const courseRemovedHandler = (course: Course) => {
    dispatch(removeCourse(course.id));
  };

  const generatePressedHandler = () => {};

  return (
    <>
      <div className="flex flex-col">
        <CourseMenu
          courses={courses}
          onCourseAdded={courseAddedHandler}
          onCourseChanged={courseChangedHandler}
          onCourseRemoved={courseRemovedHandler}
        />
        <div className="flex flex-row justify-center py-2">
          <button
            onClick={generatePressedHandler}
            className="bg-bittersweet text-white text-s px-4 py-1 rounded-lg shadow-lg hover:bg-bittersweet-700 transition duration-300"
          >
            Generate
          </button>
        </div>
      </div>
      <Schedule events={events} />
    </>
  );
};

export default Planner;
