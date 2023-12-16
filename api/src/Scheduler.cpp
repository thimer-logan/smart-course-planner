#include "SchedulePlanner/Scheduler.h"

Scheduler::Scheduler(const std::vector<Course> &courses) : _courses(courses) {
    sort_by_mrv(_courses);
}

void Scheduler::create_all_schedules() {
    Schedule current_schedule;
    backtrack(0, current_schedule);
}

const std::vector<Schedule> &Scheduler::get_all_schedules() const {
    return _all_schedules;
}

const std::vector<Course>& Scheduler::get_all_courses() const {
    return _courses;
}

bool Scheduler::backtrack(int course_index, Schedule &schedule) {
    if (course_index >= _courses.size()) {
        _all_schedules.push_back(schedule);
        return true;  // All courses have been scheduled
    }

    Course &current_course = _courses[course_index];
    for (const Timeslot &slot : current_course.get_available_timeslots()) {
        if (is_assignable(current_course, slot, schedule)) {
            current_course.assign_timeslot(slot);
            schedule.add_course(current_course);

            backtrack(course_index + 1, schedule);

            current_course.remove_timeslot();
            schedule.remove_course(current_course);
        }
    }
    return false;
}

bool Scheduler::is_assignable(const Course &course, const Timeslot &slot,
                              const Schedule &schedule) {
    if (schedule.has_conflict(slot)) {
        return false;
    }

    if (!course.is_valid_timeslot(slot)) {
        return false;
    }

    return true;
}

bool Scheduler::forward_check(int course_index) {
    // Implement forward checking logic
    return true;
}

void Scheduler::sort_by_mrv(std::vector<Course> &courses) {
    // Sort by number of timeslots. Minimum remaining value
    std::sort(_courses.begin(), _courses.end(),
              [](const Course &lhs, const Course &rhs) {
                  return lhs.get_available_timeslots().size() <
                         rhs.get_available_timeslots().size();
              });
}