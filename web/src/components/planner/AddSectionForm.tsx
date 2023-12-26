import React from "react";
import DayPicker from "../ui/DayPicker";
import dayjs from "dayjs";
import Timeslot, { DayOfWeek } from "../../types/Timeslot";
import { Input, TimePicker } from "antd";
import { CourseSection } from "../../types/Course";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

declare type EventValue<DateType> = DateType | null;
declare type RangeValue<DateType> =
  | [EventValue<DateType>, EventValue<DateType>]
  | null;

interface AddSectionFormProps {
  onSubmit: (section: CourseSection) => void;
  onCancel: () => void;
  invalidNames?: string[];
}

interface FormInputs {
  name: string;
  location: string;
  instructor: string;
  days: DayOfWeek[];
  times: RangeValue<dayjs.Dayjs>;
}

const AddSectionForm = ({ onSubmit, onCancel }: AddSectionFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getFieldState,
    getValues,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      location: "",
      instructor: "",
      days: [],
      times: null,
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
      timeslots: timeslots,
      location: data.location,
      instructor: data.instructor,
    };

    onSubmit(section);
  };

  const inputStyles = "hover:border-bittersweet focus:border-bittersweet";

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
              className={`${inputStyles} ${
                getFieldState("name").invalid && "border-red-600"
              }`}
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
              className={`${inputStyles} ${
                getFieldState("location").invalid && "border-red-600"
              }`}
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
              className={`${inputStyles} ${
                getFieldState("instructor").invalid && "border-red-600"
              }`}
              placeholder="Instructor"
              autoComplete="off"
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

        <Controller
          name="times"
          control={control}
          rules={{
            required: "Please enter a start and end time",
            validate: (value, formValues) => value !== null,
          }}
          render={({ field }) => (
            <TimePicker.RangePicker
              className={`${inputStyles} ${
                getFieldState("times").invalid && "border-red-600"
              }`}
              format="HH:mm"
              onOk={timeSelectedHandler}
              {...field}
            />
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
