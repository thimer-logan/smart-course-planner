#include "SchedulePlanner/Schedule.h"

const std::map<std::string, Timeslot>& Schedule::get_schedule() const {
    return _course_schedule;
}

bool Schedule::add_course(const Course& course) {
    if (has_conflict(course)) {
        return false;  // Conflict detected, don't add the course
    }

    _course_schedule[course.get_id()] = course.get_assigned_timeslot();
    return true;
}

void Schedule::remove_course(const std::string& course_id) {
    _course_schedule.erase(course_id);
}

void Schedule::remove_course(const Course& course) {
    remove_course(course.get_id());
}

bool Schedule::has_conflict(const Course& course) const {
    if (!course.is_timeslot_assigned()) {
        return false;
    }

    return has_conflict(course.get_assigned_timeslot());
}

bool Schedule::has_conflict(const Timeslot& slot) const {
    for (const auto& item : _course_schedule) {
        if (item.second.conflicts_with(slot)) {
            return true;  // Found a conflict
        }
    }
    return false;  // No conflict found
}

std::ostream& operator<<(std::ostream& os, const Schedule& schedule) {
    for (const auto& item : schedule._course_schedule) {
        os << "Course ID: " << item.first << std::endl << item.second << '\n';
    }
    return os;
}