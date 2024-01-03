import { Event } from "react-big-calendar";
import Timeslot from "./Timeslot";

export default interface Course {
  id: string;
  name: string;
  sections: CourseSection[];
  color: string;
}

export interface CourseSection {
  name: string;
  type: CourseSectionType;
  timeslots: Timeslot[];
  location: string;
  instructor: string;
}

export enum CourseSectionType {
  Lecture = "Lecture",
  Lab = "Lab",
  Seminar = "Seminar",
}

export interface CourseEvent extends Event {
  id: string;
  color: string;
}

export interface CourseResponse {
  id: string;
  timeslot: Timeslot[];
}
