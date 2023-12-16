#pragma once

#include "Schedule.h"

class Scheduler {
   public:
    Scheduler(const std::vector<Course>& courses);

    void create_all_schedules();

    const std::vector<Schedule>& get_all_schedules() const;

    const std::vector<Course>& get_all_courses() const;

   private:
    bool backtrack(int course_index, Schedule& schedule);

    bool forward_check(int course_index);

    bool is_assignable(const Course& course, const Timeslot& slot, const Schedule& schedule);

    void sort_by_mrv(std::vector<Course>& courses);

    std::vector<Course> _courses;

    std::vector<Schedule> _all_schedules;
};
