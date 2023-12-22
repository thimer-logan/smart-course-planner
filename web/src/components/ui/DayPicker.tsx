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
          className={`h-10 w-10 rounded-full hover:bg-khaki-300 ${
            selectedDays.includes(day) ? "bg-khaki text-white" : "bg-gray-200"
          }`}
        >
          {day.charAt(0)}
        </button>
      ))}
    </div>
  );
};

export default DayPicker;
