import Course from "../../types/Course";
import courseColors from "../../constants/courseColors";
import { useState } from "react";
import Modal from "../ui/Modal";
import AddCourseForm from "../planner/AddCourseForm";

interface CourseMenuProps {
  courses: Course[];
}

const CourseMenu = ({ courses }: CourseMenuProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="p-4 w-64 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-700">Courses</h2>
          <button
            className="text-sm text-bittersweet-500 hover:text-bittersweet-700"
            onClick={handleOpenModal}
          >
            + Add new
          </button>
        </div>
        <ul>
          {courses.map((course, index) => (
            <li
              key={course.name}
              className={`${courseColors[index]} rounded-lg mb-2 p-2 shadow-inner`}
            >
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          <AddCourseForm />
        </Modal>
      )}
    </>
  );
};

export default CourseMenu;
