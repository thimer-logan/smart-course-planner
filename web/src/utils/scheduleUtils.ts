import Course, { CourseResponse } from "../types/Course";
import Schedule from "../types/Schedule";
import { isTimeslotEqual, stringToDayOfWeek } from "./courseUtils";

export const parseSchedules = (
  schedulesJson: string[][],
  courses: Course[]
): Schedule[] => {
  const schedules: Schedule[] = [];
  schedulesJson.forEach((value, index) =>
    schedules.push(parseSchedule(index, value, courses))
  );

  return schedules;
};

const parseSchedule = (
  id: number,
  scheduleJson: string[],
  courses: Course[]
): Schedule => {
  const schedule: Schedule = {
    id: id.toString(),
    courses: [],
  };

  scheduleJson.forEach((value) => {
    const course = getCourseFromString(value, courses);
    if (course !== null) {
      schedule.courses.push(course);
    }
  });

  return schedule;
};

const getCourseFromString = (course: any, courses: Course[]): Course | null => {
  const parsedCourse: CourseResponse = {
    id: course.id,
    timeslot: course.timeslot.map((slot: any) => ({
      dayOfWeek: stringToDayOfWeek(slot.dayOfWeek),
      startTime: slot.startTime,
      endTime: slot.endTime,
    })),
  };

  const idx = courses.findIndex((value) => value.id === parsedCourse.id);

  if (idx === -1) {
    return null;
  }

  const foundCourse = { ...courses[idx] };

  // Create a new copy of sections with the necessary filter applied
  // foundCourse.sections = foundCourse.sections.map((section) => ({
  //   ...section,
  //   timeslots: section.timeslots.filter((slot) =>
  //     parsedCourse.timeslot.some((parsedSlot) =>
  //       isTimeslotEqual(slot, parsedSlot)
  //     )
  //   ),
  // }));

  foundCourse.sections = foundCourse.sections.filter((section) =>
    section.timeslots.every((slot) =>
      parsedCourse.timeslot.some((parsedSlot) => {
        console.log("Slot: ", slot);
        console.log("Parsed: ", parsedSlot);
        return isTimeslotEqual(slot, parsedSlot);
      })
    )
  );

  return foundCourse;
};
