import React from "react";
import Course from "../../types/Course";
import { MdDeleteForever } from "react-icons/md";

interface CourseItemProps {
  course: Course;
  onClick: () => void;
  onDelete: () => void;
}

const CourseItem = ({ course, onClick, onDelete }: CourseItemProps) => {
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // This stops the click event from bubbling up to the parent div
    onDelete();
  };

  return (
    <div
      className={`flex flex-row justify-between items-center rounded-lg mb-2 px-2 py-1 shadow-inner cursor-pointer`}
      style={{ backgroundColor: course.color }}
      onClick={onClick}
    >
      <div>{course.name}</div>
      <div>
        <MdDeleteForever
          className="rounded-full p-1 cursor-pointer hover:bg-red-500"
          size={28}
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};

export default CourseItem;
