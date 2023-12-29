import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

interface CourseSectionTableHeaderProps {
  editEnabled: boolean;
  deleteEnabled: boolean;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CourseSectionTableHeader = ({
  editEnabled,
  deleteEnabled,
  onAdd,
  onEdit,
  onDelete,
}: CourseSectionTableHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <button
        onClick={onAdd}
        className="bg-bittersweet text-white text-s px-4 py-1 rounded-lg shadow-lg hover:bg-bittersweet-700 transition duration-300"
      >
        + New Section
      </button>
      <div className="flex flex-row justify-end items-center gap-2">
        <MdEdit
          className="rounded-full p-1 cursor-pointer hover:bg-slate-200"
          size={24}
          onClick={onEdit}
          color={editEnabled ? "black" : "#e2e8f0"}
        />
        <MdDelete
          className="rounded-full p-1 cursor-pointer hover:bg-slate-200"
          size={24}
          onClick={onDelete}
          color={deleteEnabled ? "black" : "#e2e8f0"}
        />
      </div>
    </div>
  );
};

export default CourseSectionTableHeader;
