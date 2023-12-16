#include "SchedulePlanner/Timeslot.h"

DayOfWeek operator+(DayOfWeek day, int n) {
    int numDays = static_cast<int>(DayOfWeek::Sunday) - static_cast<int>(DayOfWeek::Monday) + 1;
    int result = (static_cast<int>(day) + n) % numDays;
    if (result < 0) result += numDays;  // Handle negative values
    return static_cast<DayOfWeek>(result);
}

std::ostream& operator<<(std::ostream& os, DayOfWeek day) {
    switch (day) {
        case DayOfWeek::Monday:
            return os << "Monday";
        case DayOfWeek::Tuesday:
            return os << "Tuesday";
        case DayOfWeek::Wednesday:
            return os << "Wednesday";
        case DayOfWeek::Thursday:
            return os << "Thursday";
        case DayOfWeek::Friday:
            return os << "Friday";
        case DayOfWeek::Saturday:
            return os << "Saturday";
        case DayOfWeek::Sunday:
            return os << "Sunday";
        default:
            return os << "Unknown Day";
    }
}

Timeslot::Timeslot() {
}

Timeslot::Timeslot(const std::set<DayTimePair>& pairs)
    : _day_time_pairs(pairs) {
    _is_valid = true;
    // std::sort(_day_time_pairs.begin(), _day_time_pairs.end());
}

bool Timeslot::is_valid() const {
    return _is_valid;
}

bool Timeslot::conflicts_with(const Timeslot& other) const {
    for (const auto& pair1 : _day_time_pairs) {
        for (const auto& pair2 : other._day_time_pairs) {
            if (pair1.day == pair2.day) {
                // Check for time overlap
                if ((pair1.start_hour < pair2.end_hour) ||
                    (pair1.start_hour == pair2.end_hour && pair1.start_minute < pair2.end_minute)) {
                    if ((pair2.start_hour < pair1.end_hour) ||
                        (pair2.start_hour == pair1.end_hour && pair2.start_minute < pair1.end_minute)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

bool Timeslot::operator==(const Timeslot& other) const {
    if (_day_time_pairs.size() != other._day_time_pairs.size()) {
        return false;
    }

    for (const auto& pair : _day_time_pairs) {
        if (std::find(other._day_time_pairs.begin(), other._day_time_pairs.end(), pair) == other._day_time_pairs.end()) {
            return false;
        }
    }

    return true;
}

bool Timeslot::operator!=(const Timeslot& other) const {
    return !(*this == other);
}

std::ostream& operator<<(std::ostream& os, const Timeslot& ts) {
    for (const auto& pair : ts._day_time_pairs) {
        os << pair.day << " from " << pair.start_hour << ":" << (pair.start_minute < 10 ? "0" : "")
           << pair.start_minute << " - " << pair.end_hour << ":" << (pair.end_minute < 10 ? "0" : "")
           << pair.end_minute << std::endl;
    }
    return os;
}
