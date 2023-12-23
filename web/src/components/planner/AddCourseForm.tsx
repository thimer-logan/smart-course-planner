import { useState } from "react";
import AddSectionForm from "./AddSectionForm";
import Timeslot from "../../types/Timeslot";
import { CourseSection } from "../../types/Course";
import CourseSectionList from "../course/CourseSectionList";

const AddCourseForm = () => {
  const [addSectionVisible, setAddSectionVisible] = useState<boolean>(false);
  const [sections, setSections] = useState<CourseSection[]>([]);

  const sectionRemoveHandler = (name: string) => {
    setSections((prev) => prev.filter((e) => e.name !== name));
  };

  const sectionAddedHandler = (section: CourseSection) => {
    setSections((prev) => [...prev, section]);
    setAddSectionVisible(false);
  };

  const sectionAddCancelHandler = () => {
    setAddSectionVisible(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold text-lg">Add new course</h2>
      <div>
        <button
          onClick={() => setAddSectionVisible(true)}
          className="bg-bittersweet text-white text-s px-4 py-1 rounded-lg shadow-lg hover:bg-bittersweet-700 transition duration-300"
        >
          + New Section
        </button>
      </div>
      <div className="px-6">
        <CourseSectionList
          sections={sections}
          onRemove={sectionRemoveHandler}
        />
      </div>

      {addSectionVisible && (
        <AddSectionForm
          onSubmit={sectionAddedHandler}
          onCancel={sectionAddCancelHandler}
        />
      )}
    </div>
  );
};

export default AddCourseForm;
