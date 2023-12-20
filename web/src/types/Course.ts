import Timeslot from "./Timeslot";

export default interface Course {
  id: string;
  name: string;
  sections: CourseSection[];
}

export interface CourseSection {
  name: string;
  timeslots: Timeslot[];
  location: string;
  instructor: string;
}