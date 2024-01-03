import CourseMenu from "../components/course/CourseMenu";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Course from "../types/Course";
import {
  addCourse,
  planCoursesAsync,
  removeCourse,
  updateCourse,
} from "../redux/plannerSlice";
import ScheduleLayout from "../components/schedule/ScheduleLayout";

const Planner = () => {
  const courses = useAppSelector((state) => state.planner.courses);
  const schedules = useAppSelector((state) => state.planner.schedules);
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

  const generatePressedHandler = () => {
    dispatch(planCoursesAsync(courses));
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
        <div className="flex flex-row justify-center py-2">
          <button
            onClick={generatePressedHandler}
            className="bg-bittersweet text-white text-s px-4 py-1 rounded-lg shadow-lg hover:bg-bittersweet-700 transition duration-300"
          >
            Generate
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-grow">
        <ScheduleLayout schedules={schedules} />
      </div>
    </>
  );
};

export default Planner;
