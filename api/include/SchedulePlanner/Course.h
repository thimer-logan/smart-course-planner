#pragma once

#include <algorithm>
#include <string>
#include <vector>

#include "Timeslot.h"

class Course {
   public:
    Course(std::string id, std::string name, std::vector<Timeslot> timeslots);

    std::string get_id() const;

    std::string get_name() const;

    const std::vector<Timeslot>& get_available_timeslots() const;

    void assign_timeslot(const Timeslot& slot);

    void remove_timeslot();

    const Timeslot& get_assigned_timeslot() const;

    bool is_timeslot_assigned() const;

    bool is_valid_timeslot(const Timeslot& slot) const;

    bool operator==(const Course& other) const;

    friend std::ostream& operator<<(std::ostream& os, const Course& ts);

   private:
    std::string _courseID;
    std::string _name;
    std::vector<Timeslot> _timeslots;
    Timeslot _assigned_timeslot;
};
