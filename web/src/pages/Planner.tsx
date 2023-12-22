import React, { useMemo } from "react";
import CourseMenu from "../components/course/CourseMenu";
import Schedule from "../components/schedule/Schedule";
import { useAppSelector } from "../redux/hooks";
import { courseToCourseEvent } from "../utils/courseUtils";
import Course from "../types/Course";

const Planner = () => {
  const courses = useAppSelector((state) => state.courses.items);
  const events = useMemo(
    () => courses.flatMap((course: Course) => courseToCourseEvent(course)),
    [courses]
  );

  return (
    <>
      <CourseMenu courses={courses} />
      <Schedule events={events} />
    </>
  );
};

export default Planner;
