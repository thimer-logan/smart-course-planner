import React, { useState } from "react";
import { CourseSection } from "../../types/Course";
import Table, { ColumnsType } from "antd/es/table";
import { sortTimeslotsByDay, timeslotToString } from "../../utils/courseUtils";
import Timeslot from "../../types/Timeslot";
import CourseSectionTableHeader from "./CourseSectionTableHeader";

interface CourseSectionTableProps {
  sections: CourseSection[];
  onAdd: () => void;
  onEdit: (section: CourseSection) => void;
  onDelete: (section: CourseSection) => void;
}

const renderTimeslots = (timeslots: Timeslot[]) => {
  const sortedTimeslots = sortTimeslotsByDay(timeslots);
  const firstSlot = sortedTimeslots[0];
  const allSame = sortedTimeslots.every(
    (slot) =>
      slot.startTime === firstSlot.startTime &&
      slot.endTime === firstSlot.endTime
  );

  if (allSame) {
    const days = sortedTimeslots
      .map((slot) => timeslotToString(slot).charAt(0))
      .join("");
    return `${days} ${firstSlot.startTime} - ${firstSlot.endTime}`;
  } else {
    return sortedTimeslots.map(timeslotToString).join(", ");
  }
};

const columns: ColumnsType<CourseSection> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    // key: "type",
  },
  {
    title: "Timeslots",
    dataIndex: "timeslots",
    // key: "timeslots",
    render(value, record, index) {
      return (
        <div className="text-sm my-auto">
          {renderTimeslots(record.timeslots)}
        </div>
      );
    },
  },
  {
    title: "Location",
    dataIndex: "location",
    // key: "location",
  },
  {
    title: "Instructor",
    dataIndex: "instructor",
    // key: "instructor",
  },
];

const CourseSectionTable = ({
  sections,
  onAdd,
  onEdit,
  onDelete,
}: CourseSectionTableProps) => {
  const [selectedSection, setSelectedSection] = useState<
    CourseSection | undefined
  >(undefined);

  return (
    <div className="flex flex-col gap-1">
      <CourseSectionTableHeader
        editEnabled={selectedSection !== undefined}
        deleteEnabled={selectedSection !== undefined}
        onAdd={onAdd}
        onEdit={() => onEdit(selectedSection!)}
        onDelete={() => onDelete(selectedSection!)}
      />
      <Table
        columns={columns}
        dataSource={sections.length > 0 ? sections : []}
        size="small"
        pagination={false}
        rowKey="name"
        rowSelection={{
          type: "radio",
          preserveSelectedRowKeys: true,
          onSelect: (record, selected) => {
            console.log(record);
            setSelectedSection(record);
          },
        }}
      />
    </div>
  );
};

export default CourseSectionTable;
