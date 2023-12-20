export default interface Timeslot {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export enum DayOfWeek {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday"
}