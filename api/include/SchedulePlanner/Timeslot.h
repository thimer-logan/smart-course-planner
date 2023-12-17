#pragma once

#include <iostream>
#include <algorithm>
#include <set>
#include <string>
#include <tuple>
#include <vector>
#include <utility>
#include <sstream>
#include <stdexcept>

enum class DayOfWeek {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
    Invalid
};

DayOfWeek operator+(DayOfWeek day, int n);
std::ostream& operator<<(std::ostream& os, DayOfWeek day);

struct DayTimePair {
    DayOfWeek day;
    int start_hour;
    int start_minute;
    int end_hour;
    int end_minute;

    DayTimePair(DayOfWeek day, int startHr, int startMin, int endHr, int endMin)
        : day(day), start_hour(startHr), start_minute(startMin), end_hour(endHr), end_minute(endMin) {}

    bool operator==(const DayTimePair& other) const {
        return std::tie(day, start_hour, start_minute, end_hour, end_minute) ==
               std::tie(other.day, other.start_hour, other.start_minute, other.end_hour, other.end_minute);
    }

    // bool operator<(const DayTimePair& other) const {
    //     if (day < other.day) return true;
    //     if (day > other.day) return false;
    //     if (start_hour < other.start_hour) return true;
    //     if (start_hour > other.start_hour) return false;
    //     if (end_minute < other.end_minute) return true;
    //     return false;
    // }

    friend bool operator<(const DayTimePair& lhs, const DayTimePair& rhs) {
        if (lhs.day < rhs.day) return true;
        if (lhs.day > rhs.day) return false;
        if (lhs.start_hour < rhs.start_hour) return true;
        if (lhs.start_hour > rhs.start_hour) return false;
        if (lhs.end_minute < rhs.end_minute) return true;
        return false;
    }
};

class Timeslot {
   public:
    Timeslot();

    Timeslot(const std::set<DayTimePair>& pairs);

    const std::set<DayTimePair>& get_day_time_pairs() const;

    bool is_valid() const;

    bool conflicts_with(const Timeslot& other) const;

    bool operator==(const Timeslot& other) const;

    bool operator!=(const Timeslot& other) const;

    friend std::ostream& operator<<(std::ostream& os, const Timeslot& ts);

   private:
    std::set<DayTimePair> _day_time_pairs;
    bool _is_valid = false;
};

DayOfWeek string_to_day(const std::string& day);
std::string day_to_string(const DayOfWeek& day);

std::pair<int, int> convert_time(const std::string& time_str);
std::string convert_time_string(const std::pair<int, int>& time);
