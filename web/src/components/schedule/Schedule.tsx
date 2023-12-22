import { Calendar, momentLocalizer, EventPropGetter } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CourseEvent } from "../../types/Course";
import { getMaxAndMinTime } from "../../utils/courseUtils";

const localizer = momentLocalizer(moment);

interface ScheduleProps {
  events: CourseEvent[];
}

const Schedule = ({ events }: ScheduleProps) => {
  const { maxTime, minTime } = getMaxAndMinTime(events);

  const eventStyleGetter: EventPropGetter<CourseEvent> = (
    event,
    start,
    end,
    isSelected
  ) => {
    const style: React.CSSProperties = {
      backgroundColor: event.color,
      borderRadius: "5px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      width: "100%",
      fontSize: "0.75rem",
      whiteSpace: "pre-line",
    };

    return { style };
  };

  return (
    <Calendar
      defaultView="week"
      events={events}
      localizer={localizer}
      eventPropGetter={eventStyleGetter}
      min={minTime}
      max={maxTime}
      style={{ flexGrow: 1 }}
    />
  );
};

export default Schedule;
