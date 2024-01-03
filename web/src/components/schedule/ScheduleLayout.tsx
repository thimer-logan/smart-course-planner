import React, { useMemo, useState } from "react";
import Schedule from "../../types/Schedule";
import Course from "../../types/Course";
import { courseToCourseEvent } from "../../utils/courseUtils";
import MySchedule from "./Schedule";
import ScheduleFooter from "./ScheduleFooter";

interface ScheduleLayoutProps {
  schedules: Schedule[];
}

const ScheduleLayout = ({ schedules }: ScheduleLayoutProps) => {
  const [selectedSchedule, setSelectedSchedule] = useState<number>(0);
  const events = useMemo(() => {
    // Check if schedules is empty or selectedSchedule is out of bounds
    console.log(selectedSchedule);

    if (
      schedules.length === 0 ||
      selectedSchedule < 0 ||
      selectedSchedule >= schedules.length
    ) {
      return [];
    }

    return schedules[selectedSchedule].courses.flatMap((course: Course) =>
      courseToCourseEvent(course)
    );
  }, [schedules, selectedSchedule]);

  const pageChangedHandler = (newPage: number) => {
    console.log("new page: ", newPage);

    if (newPage > 0 && newPage <= schedules.length) {
      setSelectedSchedule(newPage - 1);
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <MySchedule events={events} />
      <ScheduleFooter
        page={selectedSchedule + 1}
        totalPages={schedules.length}
        onPageChanged={pageChangedHandler}
      />
    </div>
  );
};

export default ScheduleLayout;
