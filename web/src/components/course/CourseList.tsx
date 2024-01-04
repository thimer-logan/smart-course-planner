import Course from "../../types/Course";
import CourseItem from "./CourseItem";

interface CourseListProps {
  courses: Course[];
  onCourseClicked: (course: Course) => void;
  onCourseDelete: (course: Course) => void;
}

const CourseList = ({
  courses,
  onCourseClicked,
  onCourseDelete,
}: CourseListProps) => {
  if (courses.length <= 0) {
    return <div>Add a course to get started</div>;
  }
  return (
    <div>
      {courses.map((course, index) => (
        <CourseItem
          key={index}
          course={course}
          onClick={() => onCourseClicked(course)}
          onDelete={() => onCourseDelete(course)}
        />
      ))}
    </div>
  );
};

export default CourseList;
