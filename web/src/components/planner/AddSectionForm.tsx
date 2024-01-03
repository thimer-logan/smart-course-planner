import React from "react";
import DayPicker from "../ui/DayPicker";
import dayjs from "dayjs";
import Timeslot, { DayOfWeek } from "../../types/Timeslot";
import { Input, Select, TimePicker } from "antd";
import { CourseSection, CourseSectionType } from "../../types/Course";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

declare type EventValue<DateType> = DateType | null;
declare type RangeValue<DateType> =
  | [EventValue<DateType>, EventValue<DateType>]
  | null;

interface AddSectionFormProps {
  defaultValue?: CourseSection;
  onSubmit: (section: CourseSection) => void;
  onCancel: () => void;
  invalidNames?: string[];
}

interface FormInputs {
  name: string;
  type: CourseSectionType;
  location: string;
  instructor: string;
  days: DayOfWeek[];
  times: RangeValue<dayjs.Dayjs>;
}

const AddSectionForm = ({
  defaultValue,
  onSubmit,
  onCancel,
}: AddSectionFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      name: defaultValue?.name || "",
      type: defaultValue?.type || CourseSectionType.Lecture,
      location: defaultValue?.location || "",
      instructor: defaultValue?.instructor || "",
      days: defaultValue?.timeslots.map((s) => s.dayOfWeek) || [],
      times: defaultValue?.timeslots
        ? [
            dayjs(defaultValue?.timeslots[0].startTime, "HH:mm"),
            dayjs(defaultValue?.timeslots[0].endTime, "HH:mm"),
          ]
        : null,
    },
  });

  const submitHandler: SubmitHandler<FormInputs> = (data) => {
    const timeslots: Timeslot[] = data.days.map((day: DayOfWeek) => {
      const timeslot: Timeslot = {
        dayOfWeek: day,
        startTime: `${data.times?.[0]?.hour()}:${data.times?.[0]
          ?.minute()
          .toString()
          .padStart(2, "0")}`,
        endTime: `${data.times?.[1]?.hour()}:${data.times?.[1]
          ?.minute()
          .toString()
          .padStart(2, "0")}`,
      };
      return timeslot;
    });

    const section: CourseSection = {
      name: data.name,
      type: CourseSectionType.Lecture,
      timeslots: timeslots,
      location: data.location,
      instructor: data.instructor,
    };

    onSubmit(section);
  };

  const toggleDay = (day: DayOfWeek) => {
    const days = getValues().days;
    setValue(
      "days",
      days.includes(day) ? days.filter((d) => d !== day) : [...days, day]
    );
  };

  const timeSelectedHandler = (time: RangeValue<dayjs.Dayjs>) => {
    setValue("times", time);
  };

  const errorMessage = Object.values(errors).find((s) => s.message)?.message;

  return (
    <form
      className="flex flex-col justify-between gap-3 shadow-xl rounded-lg py-2 px-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex flex-row justify-between items-center gap-2">
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Please enter a section name",
            validate: (value, formValues) => value !== null,
          }}
          render={({ field }) => (
            <Input
              id="name"
              type="text"
              placeholder="Name"
              autoComplete="off"
              {...field}
            />
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input
              id="location"
              placeholder="Location"
              autoComplete="off"
              {...field}
            />
          )}
        />

        <Controller
          name="instructor"
          control={control}
          render={({ field }) => (
            <Input
              id="instructor"
              placeholder="Instructor"
              autoComplete="off"
              {...field}
            />
          )}
        />
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <Controller
          name="type"
          control={control}
          rules={{
            required: "Please enter a section type",
            validate: (value, formValues) => value !== null,
          }}
          render={({ field }) => (
            <Select
              className="flex-grow flex-basis-0"
              defaultValue={field.value}
              options={Object.values(CourseSectionType).map((value) => ({
                value: value,
                label: value,
              }))}
              {...field}
            />
          )}
        />
        <Controller
          name="times"
          control={control}
          rules={{
            required: "Please enter a start and end time",
            validate: (value, formValues) => value !== null,
          }}
          render={({ field }) => (
            <TimePicker.RangePicker
              format="HH:mm"
              onOk={timeSelectedHandler}
              {...field}
            />
          )}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <Controller
          name="days"
          control={control}
          rules={{
            required: "Please select at least one day",
            validate: (value, formValues) => value.length > 0,
          }}
          render={({ field }) => (
            <DayPicker selectedDays={field.value} toggleDay={toggleDay} />
          )}
        />
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="flex flex-row justify-end gap-1">
        <button
          className="bg-transparent text-bittersweet text-s px-4 py-1 rounded-lg shadow-lg hover:text-bittersweet-700 transition duration-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        <input
          type="submit"
          className="bg-bittersweet text-white text-s px-4 py-1 rounded-lg shadow-lg hover:bg-bittersweet-700 transition duration-300"
        />
      </div>
    </form>
  );
};

export default AddSectionForm;
