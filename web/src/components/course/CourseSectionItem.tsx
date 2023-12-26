import React from "react";
import { CourseSection } from "../../types/Course";
import { DayOfWeek } from "../../types/Timeslot";
import { sortTimeslotsByDay } from "../../utils/courseUtils";

interface CourseSectionItemProps {
  section: CourseSection;
}

const CourseSectionItem = ({ section }: CourseSectionItemProps) => {
  const sortedTimeslots = sortTimeslotsByDay(section.timeslots);
  const allSame = sortedTimeslots.every(
    (slot, _, arr) =>
      slot.startTime === arr[0].startTime && slot.endTime === arr[0].endTime
  );

  let timeslots = (
    <div className="text-sm my-auto">
      {sortedTimeslots.map((slot, index) => (
        <div key={index}>
          {`${
            slot.dayOfWeek === DayOfWeek.Thursday
              ? "R"
              : slot.dayOfWeek.charAt(0)
          } ${slot.startTime} - ${slot.endTime}`}
        </div>
      ))}
    </div>
  );

  if (allSame) {
    const days = sortedTimeslots
      .map((slot) =>
        slot.dayOfWeek === DayOfWeek.Thursday ? "R" : slot.dayOfWeek.charAt(0)
      )
      .join("");

    timeslots = (
      <div className="text-sm my-auto">
        {`${days} ${sortedTimeslots[0].startTime} - ${sortedTimeslots[0].endTime}`}
      </div>
    );
  }

  return (
    <>
      <div className="text-sm my-auto">{section.name}</div>
      {timeslots}
      <div className="text-sm my-auto">{section.location}</div>
      <div className="text-sm my-auto">{section.instructor}</div>
    </>
  );
};

export default CourseSectionItem;
