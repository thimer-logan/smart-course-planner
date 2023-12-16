#define BOOST_TEST_MODULE COURSE_TEST

#include <boost/test/included/unit_test.hpp>
#include "SchedulePlanner/Course.h"

BOOST_AUTO_TEST_CASE(test_constructor_and_getters) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);
    const Timeslot slot1(pairs);
    std::vector<Timeslot> timeslots = { Timeslot(slot1) };
    Course course("CS101", "Introduction to Computer Science", timeslots);

    BOOST_CHECK_EQUAL(course.get_id(), "CS101");
    BOOST_CHECK_EQUAL(course.get_name(), "Introduction to Computer Science");
    BOOST_CHECK_EQUAL(course.get_available_timeslots().size(), 1);
}

BOOST_AUTO_TEST_CASE(test_timeslot_assignment) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    std::set<DayTimePair> pairs2;
    pairs2.emplace(DayOfWeek::Monday, 10, 0, 10, 50);
    pairs2.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    Timeslot validSlot(pairs);
    Timeslot invalidSlot(pairs2);
    std::vector<Timeslot> timeslots = { validSlot };
    Course course("CS101", "Intro to CS", timeslots);

    course.assign_timeslot(validSlot);
    BOOST_CHECK(course.is_timeslot_assigned());
    BOOST_CHECK_EQUAL(course.get_assigned_timeslot(), validSlot);

    course.assign_timeslot(invalidSlot);
    BOOST_CHECK_NE(course.get_assigned_timeslot(), invalidSlot);
}

BOOST_AUTO_TEST_CASE(test_timeslot_removal) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    Timeslot validSlot(pairs);
    std::vector<Timeslot> timeslots = { validSlot };
    Course course("CS101", "Intro to CS", timeslots);

    course.assign_timeslot(validSlot);
    BOOST_CHECK(course.is_timeslot_assigned());

    course.remove_timeslot();
    BOOST_CHECK(!course.is_timeslot_assigned());
}

BOOST_AUTO_TEST_CASE(test_timeslot_validation) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    std::set<DayTimePair> pairs2;
    pairs2.emplace(DayOfWeek::Monday, 10, 0, 10, 50);
    pairs2.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Friday, 9, 0, 9, 50);

    Timeslot validSlot(pairs);
    Timeslot invalidSlot(pairs2);

    std::vector<Timeslot> timeslots = { validSlot };
    Course course("CS101", "Intro to CS", timeslots);

    BOOST_CHECK(course.is_valid_timeslot(validSlot));
    BOOST_CHECK(!course.is_valid_timeslot(invalidSlot));
}