#define BOOST_TEST_MODULE SCHEDULER_TEST

#include <boost/test/included/unit_test.hpp>

#include "SchedulePlanner/Scheduler.h"

std::set<DayTimePair> create_day_time_pairs(DayOfWeek day, int startHour, int startMinute, int endHour, int endMinute, int numPairs, int offset) {
    std::set<DayTimePair> pairs;
    for (int i = 0; i < numPairs; i++) {
        pairs.emplace(day + i*offset, startHour, startMinute, endHour, endMinute);
    }
    
    return pairs;
}

BOOST_AUTO_TEST_CASE(test_constructor) {
    std::set<DayTimePair> pairs = create_day_time_pairs(DayOfWeek::Monday, 9, 0, 9, 50, 3, 2);
    std::set<DayTimePair> pairs1 = create_day_time_pairs(DayOfWeek::Tuesday, 10, 0, 10, 50, 2, 2);
    std::set<DayTimePair> pairs2 = create_day_time_pairs(DayOfWeek::Monday, 10, 0, 10, 50, 3, 2);

    const Timeslot timeslot(pairs);
    const Timeslot timeslot1(pairs1);
    Timeslot timeslot2(pairs2);

    Course course1("CS101", "Intro to CS", {timeslot, timeslot2});
    Course course2("CS102", "Data Structures", {timeslot1});

    Scheduler scheduler({course1, course2});
    auto courses = scheduler.get_all_courses();

    BOOST_CHECK_EQUAL(courses.size(), 2);
    BOOST_CHECK_EQUAL(courses[0], course2);
    BOOST_CHECK_EQUAL(courses[1], course1);
}

BOOST_AUTO_TEST_CASE(test_create) {
    std::set<DayTimePair> pairs = create_day_time_pairs(DayOfWeek::Monday, 9, 0, 9, 50, 3, 2);
    std::set<DayTimePair> pairs1 = create_day_time_pairs(DayOfWeek::Tuesday, 10, 0, 10, 50, 2, 2);
    std::set<DayTimePair> pairs2 = create_day_time_pairs(DayOfWeek::Monday, 10, 0, 10, 50, 3, 2);

    const Timeslot timeslot(pairs);
    const Timeslot timeslot1(pairs1);
    const Timeslot timeslot2(pairs2);

    Course course1("CS101", "Intro to CS", {timeslot, timeslot2});
    Course course2("CS102", "Data Structures", {timeslot1});

    Scheduler scheduler({course1, course2});
    scheduler.create_all_schedules();
    auto schedules = scheduler.get_all_schedules();

    BOOST_CHECK_EQUAL(schedules.size(), 2);
    auto schedule1 = schedules[0].get_schedule();
    auto schedule2 = schedules[1].get_schedule();
    BOOST_CHECK(schedule1.find(course1.get_id()) != schedule1.end());
    BOOST_CHECK(schedule1.find(course2.get_id()) != schedule1.end());
    BOOST_CHECK(schedule2.find(course1.get_id()) != schedule2.end());
    BOOST_CHECK(schedule2.find(course2.get_id()) != schedule2.end());

    BOOST_CHECK(schedule1.at(course1.get_id()) != schedule2.at(course1.get_id()));
    BOOST_CHECK(schedule1.at(course2.get_id()) == schedule2.at(course2.get_id()));
}

BOOST_AUTO_TEST_CASE(test_create_conflict) {
    std::set<DayTimePair> pairs = create_day_time_pairs(DayOfWeek::Monday, 9, 0, 9, 50, 3, 2);
    std::set<DayTimePair> pairs1 = create_day_time_pairs(DayOfWeek::Tuesday, 10, 0, 10, 50, 2, 2);
    std::set<DayTimePair> pairs2 = create_day_time_pairs(DayOfWeek::Monday, 10, 0, 10, 50, 3, 2);
    std::set<DayTimePair> pairs3 = create_day_time_pairs(DayOfWeek::Monday, 10, 0, 10, 50, 3, 2);

    const Timeslot timeslot(pairs);
    const Timeslot timeslot1(pairs1);
    const Timeslot timeslot2(pairs2);
    const Timeslot timeslot3(pairs3);

    Course course1("CS101", "Intro to CS", {timeslot, timeslot2});
    Course course2("CS102", "Data Structures", {timeslot1, timeslot3});

    Scheduler scheduler({course1, course2});
    scheduler.create_all_schedules();
    auto schedules = scheduler.get_all_schedules();

    BOOST_CHECK_EQUAL(schedules.size(), 3);
    auto schedule1 = schedules[0].get_schedule();
    auto schedule2 = schedules[1].get_schedule();
    auto schedule3 = schedules[2].get_schedule();
    BOOST_CHECK(schedule1.find(course1.get_id()) != schedule1.end());
    BOOST_CHECK(schedule1.find(course2.get_id()) != schedule1.end());
    BOOST_CHECK(schedule2.find(course1.get_id()) != schedule2.end());
    BOOST_CHECK(schedule2.find(course2.get_id()) != schedule2.end());
    BOOST_CHECK(schedule3.find(course1.get_id()) != schedule3.end());
    BOOST_CHECK(schedule3.find(course2.get_id()) != schedule3.end());

    // BOOST_CHECK(schedule1.at(course1.get_id()) != schedule2.at(course1.get_id()) != schedule3.at(course1.get_id()));
    // BOOST_CHECK(schedule1.at(course2.get_id()) != schedule2.at(course2.get_id()));
}