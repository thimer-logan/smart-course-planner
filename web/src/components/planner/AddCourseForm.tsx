import { useState } from "react";
import AddSectionForm from "./AddSectionForm";
import Course, { CourseSection } from "../../types/Course";
import CourseSectionList from "../course/CourseSectionList";
import { Input } from "antd";
import ColorPicker from "../ui/ColorPicker";
import { courseHexColors } from "../../constants/courseColors";

interface AddCourseFormProps {
  onSubmit: (course: Course) => void;
  onCancel: () => void;
  defaultValue?: Course;
}

const AddCourseForm = ({
  onSubmit,
  onCancel,
  defaultValue,
}: AddCourseFormProps) => {
  const [addSectionVisible, setAddSectionVisible] = useState<boolean>(false);
  const [course, setCourse] = useState<Course>({
    id: defaultValue?.id || "",
    name: defaultValue?.name || "",
    sections: defaultValue?.sections || [],
    color: defaultValue?.color || "",
  });
  const [errors, setErrors] = useState({
    id: "",
    name: "",
    color: "",
    sections: "",
  });

  const inputStyles = "hover:border-bittersweet focus:border-bittersweet";

  const updateField = (field: string, value: string | CourseSection[]) => {
    setCourse((prevCourse) => ({ ...prevCourse, [field]: value }));
  };

  // Validation functions
  const validateField = {
    id: () => course.id.trim() !== "",
    name: () => course.name.trim() !== "",
    color: () => course.color.trim() !== "",
    sections: () => course.sections.length > 0,
  };

  const sectionRemoveHandler = (name: string) => {
    updateField(
      "sections",
      course.sections.filter((e) => e.name !== name)
    );
  };

  const sectionAddedHandler = (section: CourseSection) => {
    updateField("sections", [...course.sections, section]);
    setAddSectionVisible(false);
  };

  const sectionAddCancelHandler = () => {
    setAddSectionVisible(false);
  };

  const colorSelectedHandler = (color: string) => {
    updateField("color", color === course.color ? "" : color);
  };

  const inputChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateField(id, value);
  };

  const submitHandler = () => {
    const isValid = Object.entries(validateField).reduce(
      (valid, [field, validate]) => {
        const isFieldValid = validate();

        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: isFieldValid ? "" : `${field} is required`,
        }));

        return valid && isFieldValid;
      },
      true
    );

    if (isValid) {
      onSubmit(course);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold text-lg">Add new course</h2>
      <div className="flex flex-row justify-between gap-3 my-2">
        <Input
          id="id"
          type="text"
          className={`${inputStyles}`}
          value={course.id}
          onChange={inputChangedHandler}
          placeholder="Course ID"
          autoComplete="off"
          status={`${errors.id && "error"}`}
        />

        <Input
          id="name"
          type="text"
          className={`${inputStyles}`}
          value={course.name}
          onChange={inputChangedHandler}
          placeholder="Course Name"
          autoComplete="off"
          status={`${errors.name && "error"}`}
        />
      </div>
      <div className="pb-3">
        <ColorPicker
          colors={courseHexColors}
          selectedColor={course.color}
          onColorSelect={colorSelectedHandler}
        />
      </div>
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
          sections={course.sections}
          onRemove={sectionRemoveHandler}
        />
      </div>

      {addSectionVisible && (
        <AddSectionForm
          onSubmit={sectionAddedHandler}
          onCancel={sectionAddCancelHandler}
        />
      )}

      {Object.entries(errors).map(
        ([field, error]) =>
          error &&
          field !== "id" &&
          field !== "name" && (
            <p key={field} className="text-red-500">
              {error}
            </p>
          )
      )}

      <div className="flex flex-row justify-end gap-1 mt-4">
        <button
          className="bg-transparent text-bittersweet text-s px-4 py-1 rounded-lg shadow-lg hover:text-bittersweet-700 transition duration-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-bittersweet text-white text-s px-4 py-1 rounded-lg shadow-lg hover:bg-bittersweet-700 transition duration-300"
          onClick={submitHandler}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddCourseForm;
