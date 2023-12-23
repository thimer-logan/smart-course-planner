import React from "react";
import { CourseSection } from "../../types/Course";
import { DayOfWeek } from "../../types/Timeslot";

interface CourseSectionItemProps {
  section: CourseSection;
}

const CourseSectionItem = ({ section }: CourseSectionItemProps) => {
  const allSame = section.timeslots.every(
    (slot, _, arr) =>
      slot.startTime === arr[0].startTime && slot.endTime === arr[0].endTime
  );

  let timeslots = (
    <div className="text-sm my-auto">
      {section.timeslots.map((slot, index) => (
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
    const days = section.timeslots
      .map((slot) =>
        slot.dayOfWeek === DayOfWeek.Thursday ? "R" : slot.dayOfWeek.charAt(0)
      )
      .join("");

    timeslots = (
      <div className="text-sm my-auto">
        {`${days} ${section.timeslots[0].startTime} - ${section.timeslots[0].endTime}`}
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
