import React from "react";
import Course from "../../types/Course";

const CourseItem = (props: Course) => {
  return (
    <div className="flex flex-col items-start p-2 rounded-md bg-bittersweet">
      <h2>
        <strong>{props.id}</strong> - {props.name}
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="font-bold">Name</div>
        <div className="font-bold">Timeslots</div>
        <div className="font-bold">Location</div>
        <div className="font-bold">Instructor</div>

        {props.sections.map((course) => (
          <>
            <div>{course.name}</div>
            <div>
              {course.timeslots.map((slot, index) => (
                <div key={index}>
                  {`${slot.dayOfWeek} ${slot.startTime} - ${slot.endTime}`}
                </div>
              ))}
            </div>
            <div>{course.location}</div>
            <div>{course.instructor}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CourseItem;
