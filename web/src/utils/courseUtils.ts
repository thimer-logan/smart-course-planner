import Course, { CourseEvent, CourseSection } from "../types/Course";
import Timeslot, { DayOfWeek } from "../types/Timeslot";

export const getDayOfWeek = (dayName: string): Date => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const todayDayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, etc.
  const dayIndex = daysOfWeek.indexOf(dayName);

  let targetDay = new Date(today);
  targetDay.setDate(today.getDate() + (dayIndex - todayDayOfWeek));
  targetDay.setHours(0, 0, 0, 0); // reset hours, minutes, seconds, and ms

  return targetDay;
};

export const timeslotToEvent = (timeslot: Timeslot): CourseEvent => {
  const day = getDayOfWeek(timeslot.dayOfWeek);

  const startTimeParts = timeslot.startTime.split(":");
  const endTimeParts = timeslot.endTime.split(":");

  const startDate = new Date(day);
  startDate.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));

  const endDate = new Date(day);
  endDate.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));

  const courseEvent: CourseEvent = {
    start: startDate,
    end: endDate,
    id: "",
    color: "",
  };

  return courseEvent;
};

export const courseToCourseEvent = (course: Course): CourseEvent[] => {
  const courseEvents: CourseEvent[] = course.sections.flatMap(
    (section: CourseSection) => {
      return section.timeslots.map((timeslot: Timeslot) => {
        const slot: CourseEvent = timeslotToEvent(timeslot);
        slot.id = course.id;
        slot.color = course.color;
        slot.title = `${course.id} ${section.name}\n${section.location}`;
        return slot;
      });
    }
  );

  return courseEvents;
};

export const getMaxAndMinTime = (
  courses: CourseEvent[]
): { maxTime: Date; minTime: Date } => {
  let minHour = 23;
  let minMinutes = 59;
  let maxHour = 0;
  let maxMinutes = 0;

  courses.forEach((event) => {
    if (event.start) {
      minHour = Math.min(minHour, event.start.getHours());
      minMinutes =
        event.start.getHours() === minHour
          ? Math.min(minMinutes, event.start.getMinutes())
          : minMinutes;
    }
    if (event.end) {
      maxHour = Math.max(maxHour, event.end.getHours());
      maxMinutes =
        event.end.getHours() === maxHour
          ? Math.max(maxMinutes, event.end.getMinutes())
          : maxMinutes;
    }
  });

  // Create minTime and maxTime using today's date with the min/max hours and minutes
  const today = new Date();
  const minTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    minHour,
    minMinutes
  );
  const maxTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    maxHour,
    maxMinutes,
    59
  );

  return { maxTime, minTime };
};

export const sortTimeslotsByDay = (timeslots: Timeslot[]): Timeslot[] => {
  const timeslotsCopy = [...timeslots];
  return timeslotsCopy.sort((a, b) => {
    const order = [
      DayOfWeek.Sunday,
      DayOfWeek.Monday,
      DayOfWeek.Tuesday,
      DayOfWeek.Wednesday,
      DayOfWeek.Thursday,
      DayOfWeek.Friday,
      DayOfWeek.Saturday,
    ];

    return order.indexOf(a.dayOfWeek) - order.indexOf(b.dayOfWeek);
  });
};

export const timeslotToString = (slot: Timeslot) => {
  const day =
    slot.dayOfWeek === DayOfWeek.Thursday ? "R" : slot.dayOfWeek.charAt(0);
  return `${day} ${slot.startTime} - ${slot.endTime}`;
};
