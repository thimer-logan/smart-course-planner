import Course from "../../types/Course";
import CourseItem from "./CourseItem";

interface CourseListProps {
  courses: Course[];
}

const CourseList = ({ courses }: CourseListProps) => {
  return (
    <div className="flex flex-col gap-2 m-3">
      {courses.map((course: Course) => (
        <CourseItem {...course} />
      ))}
    </div>
  );
};

export default CourseList;
