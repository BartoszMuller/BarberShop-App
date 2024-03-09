import getGradientValue from "../utils/getGradientValue";
import styles from "./CalendarDays.module.scss";
import { isSameDay, format } from "date-fns";
import { useContext } from "react";
import AppointmentsContext from "@/context/appointments-panel/appointments.context";

const CalendarAvailableDay = (props) => {
  const { selectedDay, appointments, monthNumber, showDetailsOfDay } =
    useContext(AppointmentsContext);
  const { day } = props;

  const currentAppointments = appointments[monthNumber];

  return (
    <div
      onClick={() => showDetailsOfDay(day)}
      className={
        isSameDay(selectedDay.date, day) ? styles.picked : styles.available
      }
      style={{
        "--gradient-red": getGradientValue(currentAppointments, day),
      }}
    >
      {format(day, "dd")}
    </div>
  );
};
export default CalendarAvailableDay;
