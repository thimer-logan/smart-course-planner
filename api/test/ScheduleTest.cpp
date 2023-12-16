#define BOOST_TEST_MODULE SCHEDULE_TEST

#include <boost/test/included/unit_test.hpp>
#include "SchedulePlanner/Schedule.h"

BOOST_AUTO_TEST_CASE(test_add_course_no_conflict) {
    Schedule schedule;
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    std::set<DayTimePair> pairs2;
    pairs2.emplace(DayOfWeek::Monday, 10, 0, 10, 50);
    pairs2.emplace(DayOfWeek::Wednesday, 10, 0, 10, 50);
    pairs2.emplace(DayOfWeek::Friday, 10, 0, 10, 50);

    const Timeslot timeslot1(pairs);
    Timeslot timeslot2(pairs2);

    Course course1("CS101", "Intro to CS", {timeslot1});
    Course course2("CS102", "Data Structures", {timeslot2});

    course1.assign_timeslot(timeslot1);
    course2.assign_timeslot(timeslot2);

    BOOST_CHECK(schedule.add_course(course1)); 
    BOOST_CHECK(schedule.add_course(course2));  
}

BOOST_AUTO_TEST_CASE(test_add_course_with_conflict) {
    Schedule schedule;
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    const Timeslot timeslot1(pairs);
    Timeslot timeslot2(pairs);

    Course course1("CS101", "Intro to CS", {timeslot1});
    Course course2("CS102", "Data Structures", {timeslot2});

    course1.assign_timeslot(timeslot1);
    course2.assign_timeslot(timeslot2);

    BOOST_CHECK(schedule.add_course(course1)); 
    BOOST_CHECK(!schedule.add_course(course2));
}

BOOST_AUTO_TEST_CASE(test_remove_course) {
    Schedule schedule;
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    const Timeslot timeslot1(pairs);

    Course course1("CS101", "Intro to CS", {timeslot1});
    course1.assign_timeslot(timeslot1);
    schedule.add_course(course1);

    schedule.remove_course("CS101");
    BOOST_CHECK(!schedule.has_conflict(course1));  // Course should no longer be in schedule
}

BOOST_AUTO_TEST_CASE(test_conflict_detection) {
    Schedule schedule;
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    const Timeslot timeslot1(pairs);

    Course course1("CS101", "Intro to CS", {timeslot1});
    course1.assign_timeslot(timeslot1);

    BOOST_CHECK(!schedule.has_conflict(course1));  // No conflict before adding

    schedule.add_course(course1);
    BOOST_CHECK(schedule.has_conflict(course1));   // Conflict after adding
}