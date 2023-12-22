import { useState } from "react";
import { DayOfWeek } from "../../types/Timeslot";
import DayPicker from "../ui/DayPicker";
import { DatePicker } from "rsuite";

const AddCourseForm = () => {
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [addSectionVisible, setAddSectionVisible] = useState<boolean>(false);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays((currentDays) =>
      currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day]
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold text-lg">Add new course</h2>
      <div>
        <button
          onClick={() => setAddSectionVisible(true)}
          className="bg-bittersweet text-white text-s px-4 py-1 rounded-lg shadow-lg hover:bg-bittersweet-700 transition duration-300"
        >
          + New Section
        </button>
      </div>
      {addSectionVisible && (
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center py-4 px-2 rounded">
            <DayPicker selectedDays={selectedDays} toggleDay={toggleDay} />
            <DatePicker
              format="HH:mm"
              ranges={[]}
              placement="leftStart"
              style={{ width: 200 }}
            />
          </div>
          <div className="flex flex-row justify-end gap-1 px-2">
            <button className="bg-bittersweet text-white text-s px-4 py-1 rounded-lg shadow-lg hover:bg-bittersweet-700 transition duration-300">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;
