import Course from "../../types/Course";
import { useState } from "react";
import Modal from "../ui/Modal";
import AddCourseForm from "../planner/AddCourseForm";
import CourseList from "./CourseList";

interface CourseMenuProps {
  courses: Course[];
  onCourseAdded: (course: Course) => void;
  onCourseRemoved: (course: Course) => void;
}

const CourseMenu = ({
  courses,
  onCourseAdded,
  onCourseRemoved,
}: CourseMenuProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined
  );

  const handleOpenModal = (course?: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCourse(undefined); // Reset the selected course when the modal is closed
  };

  const courseClickedHandler = (course: Course) => {
    handleOpenModal(course);
  };

  const courseAddedHandler = (course: Course) => {
    onCourseAdded(course);
    setModalOpen(false);
  };

  const courseRemovedHandler = (course: Course) => {
    onCourseRemoved(course);
  };

  return (
    <>
      <div className="p-4 w-64 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-700">Courses</h2>
          <button
            className="text-sm text-bittersweet-500 hover:text-bittersweet-700"
            onClick={() => handleOpenModal()}
          >
            + Add new
          </button>
        </div>
        <CourseList
          courses={courses}
          onCourseClicked={courseClickedHandler}
          onCourseDelete={courseRemovedHandler}
        />
      </div>
      {modalOpen && (
        <Modal className="min-h-96">
          <AddCourseForm
            onSubmit={courseAddedHandler}
            onCancel={handleCloseModal}
            defaultValue={selectedCourse}
          />
        </Modal>
      )}
    </>
  );
};

export default CourseMenu;
