cmake_minimum_required(VERSION 3.0.0)

find_package(Boost COMPONENTS system filesystem unit_test_framework REQUIRED)

# Include directories
include_directories(${PROJECT_SOURCE_DIR}/include)

# Macro to simplify test executable creation
macro(add_boost_test TESTNAME)
    add_executable(${TESTNAME} ${TESTNAME}.cpp)
    target_link_libraries(${TESTNAME} SchedulePlannerLib Boost::unit_test_framework)
    add_test(NAME ${TESTNAME} COMMAND ${TESTNAME})
endmacro()

# Enable testing
enable_testing()

# Use the macro to add tests
add_boost_test(TimeslotTest)
add_boost_test(CourseTest)
add_boost_test(ScheduleTest)
add_boost_test(SchedulerTest)