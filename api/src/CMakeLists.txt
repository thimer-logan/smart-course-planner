cmake_minimum_required(VERSION 3.0.0)
set(LIBRARY_NAME ${PROJECT_NAME}Lib)

find_package(cpprestsdk CONFIG REQUIRED)

add_library(${LIBRARY_NAME} Course.cpp Timeslot.cpp Scheduler.cpp Schedule.cpp)
target_include_directories(${LIBRARY_NAME} PUBLIC ${PROJECT_SOURCE_DIR}/include)

add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} PRIVATE ${LIBRARY_NAME} cpprestsdk::cpprest cpprestsdk::cpprestsdk_zlib_internal cpprestsdk::cpprestsdk_brotli_internal)

target_compile_features(${PROJECT_NAME} PUBLIC cxx_std_20)

target_include_directories(${PROJECT_NAME} PUBLIC ${PROJECT_SOURCE_DIR}/include)