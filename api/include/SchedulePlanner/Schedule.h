#pragma once

#include <map>

#include "Course.h"

class Schedule {
   public:
    Schedule() = default;

    const std::map<std::string, Timeslot>& get_schedule() const;

    // Add a course to the schedule
    bool add_course(const Course& course);

    // Remove a course from the schedule
    void remove_course(const std::string& course_id);

    void remove_course(const Course& course);

    // Check if adding a course creates a conflict
    bool has_conflict(const Course& course) const;

    bool has_conflict(const Timeslot& slot) const;

    friend std::ostream& operator<<(std::ostream& os, const Schedule& schedule);

   private:
    std::map<std::string, Timeslot> _course_schedule;
};