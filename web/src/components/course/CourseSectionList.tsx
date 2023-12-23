import React from "react";
import { CourseSection } from "../../types/Course";
import CourseSectionItem from "./CourseSectionItem";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface CourseSectionListProps {
  sections: CourseSection[];
  onRemove: (name: string) => void;
}

const CourseSectionList = ({ sections, onRemove }: CourseSectionListProps) => {
  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="font-bold">Name</div>
      <div className="font-bold">Timeslots</div>
      <div className="font-bold">Location</div>
      <div className="font-bold">Instructor</div>
      <div className="font-bold"></div>

      {sections.map((section) => (
        <>
          <CourseSectionItem key={section.name} section={section} />
          <div>
            <MdOutlineDeleteOutline
              className="rounded-full p-1 cursor-pointer hover:bg-slate-300"
              size={28}
              onClick={() => onRemove(section.name)}
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default CourseSectionList;
