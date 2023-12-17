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

DayOfWeek string_to_day(const std::string& day) {
    if (day == "Monday") return DayOfWeek::Monday;
    else if (day == "Tuesday") return DayOfWeek::Tuesday;
    else if (day == "Wednesday") return DayOfWeek::Wednesday;
    else if (day == "Thursday") return DayOfWeek::Thursday;
    else if (day == "Friday") return DayOfWeek::Friday;
    else if (day == "Saturday") return DayOfWeek::Saturday;
    else if (day == "Sunday") return DayOfWeek::Sunday;
    else return DayOfWeek::Invalid;
}

std::string day_to_string(const DayOfWeek& day) {
    switch (day) {
        case DayOfWeek::Monday:
            return "Monday";
        case DayOfWeek::Tuesday:
            return "Tuesday";
        case DayOfWeek::Wednesday:
            return "Wednesday";
        case DayOfWeek::Thursday:
            return "Thursday";
        case DayOfWeek::Friday:
            return "Friday";
        case DayOfWeek::Saturday:
            return "Saturday";
        case DayOfWeek::Sunday:
            return "Sunday";
        default:
            return "Unknown Day";
    }
}

std::pair<int, int> convert_time(const std::string& time_str) {
    std::istringstream iss(time_str);
    int hour, minute;
    char delim;

    if (!(iss >> hour >> delim >> minute) || delim != ':' || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        throw std::invalid_argument("Invalid time format");
    }

    return std::make_pair(hour, minute);
}

std::string convert_time_string(const std::pair<int, int>& time) {
    return (std::to_string(time.first) + ":" + std::to_string(time.second));
}
