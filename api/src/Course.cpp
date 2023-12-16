#include "SchedulePlanner/Course.h"

Course::Course(std::string id, std::string name, std::vector<Timeslot> timeslots) : _courseID(id), _name(name), _timeslots(timeslots) {
}

std::string Course::get_id() const {
    return _courseID;
}

std::string Course::get_name() const {
    return _name;
}

const std::vector<Timeslot> &Course::get_available_timeslots() const {
    return _timeslots;
}

void Course::assign_timeslot(const Timeslot &slot) {
    if (is_valid_timeslot(slot)) {
        _assigned_timeslot = slot;
    }
}

void Course::remove_timeslot() {
    _assigned_timeslot = Timeslot();
}

const Timeslot &Course::get_assigned_timeslot() const {
    return _assigned_timeslot;
}

bool Course::is_timeslot_assigned() const {
    return _assigned_timeslot.is_valid();
}

bool Course::is_valid_timeslot(const Timeslot& slot) const {
    if (std::find(_timeslots.begin(), _timeslots.end(), slot) != _timeslots.end()) {
        return true;
    }

    return false;
}

bool Course::operator==(const Course& other) const {
    return get_id() == other.get_id();
}

std::ostream& operator<<(std::ostream& os, const Course& course) {
    os << "Course ID: " << course.get_id() << "\n" << "Course Name: "
       << course.get_name() << "\n" << "Assigned Timeslot: " << course.get_assigned_timeslot()
       << std::endl;

    return os;
}