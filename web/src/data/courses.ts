import { courseHexColors } from "../constants/courseColors";
import Course from "../types/Course";
import { DayOfWeek } from "../types/Timeslot";

const courses: Course[] = [
  {
    id: "CMPUT 379",
    name: "Operating Systems",
    sections: [
      {
        name: "LEC B1",
        location: "MEC 4-3",
        instructor: "John Smith",
        timeslots: [
          {
            dayOfWeek: DayOfWeek.Monday,
            startTime: "9:00",
            endTime: "9:50",
          },
          {
            dayOfWeek: DayOfWeek.Wednesday,
            startTime: "9:00",
            endTime: "9:50",
          },
          {
            dayOfWeek: DayOfWeek.Friday,
            startTime: "9:00",
            endTime: "9:50",
          },
        ],
      },
    ],
    color: courseHexColors[0],
  },
  {
    id: "ECE 449",
    name: "Machine Learning",
    sections: [
      {
        name: "LEC A1",
        location: "NREF 1-2",
        instructor: "Rick Sanchez",
        timeslots: [
          {
            dayOfWeek: DayOfWeek.Tuesday,
            startTime: "11:00",
            endTime: "12:20",
          },
          {
            dayOfWeek: DayOfWeek.Thursday,
            startTime: "11:00",
            endTime: "12:20",
          },
        ],
      },
      {
        name: "LAB H22",
        location: "ETLC 5-11",
        instructor: "Bob Jenkins",
        timeslots: [
          {
            dayOfWeek: DayOfWeek.Tuesday,
            startTime: "14:00",
            endTime: "16:50",
          },
        ],
      },
    ],
    color: courseHexColors[1],
  },
  {
    id: "CMPUT 301",
    name: "Intro to Software Engineering",
    sections: [
      {
        name: "LEC B1",
        location: "CCIS L1-140",
        instructor: "Bob Ross",
        timeslots: [
          {
            dayOfWeek: DayOfWeek.Monday,
            startTime: "10:00",
            endTime: "10:50",
          },
          {
            dayOfWeek: DayOfWeek.Wednesday,
            startTime: "10:00",
            endTime: "10:50",
          },
          {
            dayOfWeek: DayOfWeek.Friday,
            startTime: "10:00",
            endTime: "10:50",
          },
        ],
      },
    ],
    color: courseHexColors[2],
  },
];

export default courses;
