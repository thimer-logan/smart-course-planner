import Course from "../types/Course";

export const fetchPlans = async (courses: Course[]) => {
  const coursesJson = stringifyCourses(courses);
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
    const timeslots = course.sections.map((section) => section.timeslots);

    // Create the transformed course object
    const transformedCourse = {
      id: course.id,
      name: course.name,
      timeslots: timeslots,
    };

    return transformedCourse;
  });

  return JSON.stringify({ courses: transformedCourses });
};
