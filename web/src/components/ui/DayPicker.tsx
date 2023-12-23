import React from "react";
import { DayOfWeek } from "../../types/Timeslot";

interface DayPickerProps {
  selectedDays: DayOfWeek[];
  toggleDay: (day: DayOfWeek) => void;
}

const DayPicker = ({ selectedDays, toggleDay }: DayPickerProps) => {
  return (
    <div className="flex items-center space-x-2">
      {Object.values(DayOfWeek).map((day) => (
        <button
          key={day}
          onClick={() => toggleDay(day)}
          className={`h-9 w-9 rounded-full hover:bg-khaki-300 ${
            selectedDays.includes(day) ? "bg-khaki text-white" : "bg-gray-200"
          }`}
        >
          {day === DayOfWeek.Thursday ? "R" : day.charAt(0)}
        </button>
      ))}
    </div>
  );
};

export default DayPicker;
