
#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include <cpprest/uri.h>

#include <iostream>

#include "SchedulePlanner/Scheduler.h"

using namespace utility;
using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

json::value timeslot_to_json(const Timeslot& slot) {
    json::value timeslot = json::value::array();
    int i = 0;
    for (const auto& pair : slot.get_day_time_pairs()) {
        json::value timeslot_pair = json::value::object();
        timeslot_pair[U("dayOfWeek")] = json::value::string(conversions::to_string_t(day_to_string(pair.day)));
        timeslot_pair[U("startTime")] = json::value::string(conversions::to_string_t(convert_time_string({pair.start_hour, pair.start_minute})));
        timeslot_pair[U("endTime")] = json::value::string(conversions::to_string_t(convert_time_string({pair.end_hour, pair.end_minute})));
        timeslot[i] = timeslot_pair;

        i++;
    }

    return timeslot;
}

void handle_post(http_request request) {
    if (request.relative_uri().path() == U("/schedule/create")) {
        std::cout << "Create" << std::endl;
        json::value body = request.extract_json().get();

        // Check if the "courses" key exists and is not empty
        if (!body.has_field(U("courses")) || !body[U("courses")].is_array()) {
            std::cout << "Bad Request" << std::endl;
            request.reply(status_codes::BadRequest, U("Invalid data format! Expected 'courses' field with size > 0."));
            return;
        }

        json::array courses_arr = body[U("courses")].as_array();
        std::vector<Course> courses;

        for (auto& course : courses_arr) {
            std::string course_id = conversions::to_utf8string(course[U("id")].as_string());
            std::string course_name = conversions::to_utf8string(course[U("name")].as_string());

            if (course.has_field(U("timeslots")) && course[U("timeslots")].is_array()) {
                std::vector<Timeslot> timeslots;

                for (auto& timeslot : course[U("timeslots")].as_array()) {
                    if (timeslot.is_array()) {
                        std::set<DayTimePair> pairs;
                        for (auto& slot : timeslot.as_array()) {
                            DayOfWeek day = string_to_day(conversions::to_utf8string(slot[U("dayOfWeek")].as_string()));
                            auto start_time = convert_time(conversions::to_utf8string(slot[U("startTime")].as_string()));
                            auto end_time = convert_time(conversions::to_utf8string(slot[U("endTime")].as_string()));

                            pairs.emplace(day, start_time.first, start_time.second, end_time.first, end_time.second);
                        }

                        timeslots.emplace_back(pairs);
                    }
                }

                courses.emplace_back(course_id, course_name, timeslots);
            }
        }

        Scheduler scheduler(courses);
        scheduler.create_all_schedules();
        auto schedules = scheduler.get_all_schedules();

        if (schedules.size() < 1) {
            std::cout << "Could not create schedules" << std::endl;
        }

        json::value json_schedules = json::value::array();
        int i = 0;

        for (const auto& schedule : schedules) {
            json::value json_schedule = json::value::array();
            int j = 0;

            for (const auto& course : schedule.get_schedule()) {
                json::value json_course = json::value::object();
                json_course[U("id")] = json::value::string(conversions::to_string_t(course.first));
                json_course[U("timeslot")] = timeslot_to_json(course.second);
                json_schedule[j] = json_course;

                j++;
            }

            json_schedules[i] = json_schedule;
            i++;
        }

        std::cout << "Response created of size " << json_schedules.size() << std::endl;

        http_response response(status_codes::OK);
        response.headers().add(U("Access-Control-Allow-Origin"), U("*"));
        response.set_body(json_schedules);
        request.reply(response);
    } else {
        request.reply(status_codes::NotFound);
    }
}

void handle_options(http_request request) {
    http_response response(status_codes::OK);
    response.headers().add(U("Allow"), U("GET, POST, OPTIONS"));
    response.headers().add(U("Access-Control-Allow-Origin"), U("*"));
    response.headers().add(U("Access-Control-Allow-Methods"), U("GET, POST, OPTIONS"));
    response.headers().add(U("Access-Control-Allow-Headers"), U("Content-Type"));
    request.reply(response);
}

int main(int argc, char** argv) {
    http_listener listener(U("http://localhost:8080"));

    listener.support(methods::POST, handle_post);
    listener.support(methods::OPTIONS, handle_options);

    try {
        listener.open()
            .then([&listener]() { std::cout << "Listener open" << std::endl; })
            .wait();

        std::string line;
        std::getline(std::cin, line);
    } catch (std::exception& e) {
        std::cout << "Error: " << e.what() << std::endl;
    }

    return 0;
}
