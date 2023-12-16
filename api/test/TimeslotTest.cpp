#define BOOST_TEST_MODULE TIMESLOT_TEST

#include <boost/test/included/unit_test.hpp>
#include "SchedulePlanner/Timeslot.h"

BOOST_AUTO_TEST_CASE(test_is_valid) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);
    const Timeslot slot(pairs);

    BOOST_CHECK(slot.is_valid());
}

BOOST_AUTO_TEST_CASE(test_no_conflict) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);
    const Timeslot slot(pairs);

    std::set<DayTimePair> pairs2;
    pairs2.emplace(DayOfWeek::Tuesday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Thursday, 9, 0, 9, 50);
    const Timeslot slot2(pairs2);

    BOOST_CHECK(!slot.conflicts_with(slot2));
}

BOOST_AUTO_TEST_CASE(test_conflict) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);
    const Timeslot slot(pairs);

    std::set<DayTimePair> pairs2;
    pairs2.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Tuesday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Thursday, 9, 0, 9, 50);
    const Timeslot slot2(pairs2);

    BOOST_CHECK(slot.conflicts_with(slot2));
}

BOOST_AUTO_TEST_CASE(test_eq_op) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);
    const Timeslot slot(pairs);

    std::set<DayTimePair> pairs2;
    pairs2.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Friday, 9, 0, 9, 50);
    const Timeslot slot2(pairs2);

    BOOST_CHECK_EQUAL(slot, slot2);
}

BOOST_AUTO_TEST_CASE(test_eq_op_ne) {
    std::set<DayTimePair> pairs;
    pairs.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Wednesday, 9, 0, 9, 50);
    pairs.emplace(DayOfWeek::Friday, 9, 0, 9, 50);
    const Timeslot slot(pairs);

    std::set<DayTimePair> pairs2;
    pairs2.emplace(DayOfWeek::Monday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Thursday, 9, 0, 9, 50);
    pairs2.emplace(DayOfWeek::Friday, 9, 0, 9, 50);
    const Timeslot slot2(pairs2);

    BOOST_CHECK_NE(slot, slot2);
}