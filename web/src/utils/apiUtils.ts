import Course, { CourseSection, CourseSectionType } from "../types/Course";
import Timeslot from "../types/Timeslot";

export const fetchPlans = async (courses: Course[]) => {
  const coursesJson = stringifyCourses(courses);
  console.log(coursesJson);

  const response = await fetch("http://localhost:8080/schedule/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: coursesJson,
  });

  return response;
};

export const stringifyCourses = (courses: Course[]): string => {
  const transformedCourses = courses.map((course) => {
    const lectures: CourseSection[] = [],
      labs: CourseSection[] = [],
      seminars: CourseSection[] = [];

    // Single pass to categorize sections
    course.sections.forEach((section) => {
      switch (section.type) {
        case CourseSectionType.Lecture:
          lectures.push(section);
          break;
        case CourseSectionType.Lab:
          labs.push(section);
          break;
        case CourseSectionType.Seminar:
          seminars.push(section);
          break;
      }
    });

    const allCombinations: CourseSection[][] = [];

    const generateCombinations = (
      lectures: CourseSection[],
      labs: CourseSection[],
      seminars: CourseSection[],
      combination: CourseSection[] = []
    ) => {
      if (lectures.length > 0) {
        lectures.forEach((lecture) =>
          generateCombinations([], labs, seminars, combination.concat(lecture))
        );
      } else if (labs.length > 0) {
        labs.forEach((lab) =>
          generateCombinations([], [], seminars, combination.concat(lab))
        );
      } else if (seminars.length > 0) {
        seminars.forEach((seminar) =>
          generateCombinations([], [], [], combination.concat(seminar))
        );
      } else {
        allCombinations.push(combination);
      }
    };

    generateCombinations(lectures, labs, seminars);

    const timeslotCombinations: Timeslot[][] = allCombinations.map(
      (combination) => combination.flatMap((section) => section.timeslots)
    );

    const transformedCourse = {
      id: course.id,
      name: course.name,
      timeslots: timeslotCombinations,
    };

    return transformedCourse;
  });

  return JSON.stringify({ courses: transformedCourses });
};
