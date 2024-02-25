import { useContext } from "react";
import styles from "./CalendarDays.module.scss";
import { useSession } from "next-auth/react";
import AppointmentsContext from "@/context/appointments-panel/appointments_context";
import { isUserAdmin } from "@/app/api/utils/auth/verification";
import { format } from "date-fns";

const CalendarPastDay = (props) => {
  const { data: session } = useSession();
  const { showDetailsOfDay } = useContext(AppointmentsContext);
  const { day } = props;

  return (
    <div
      className={styles.past}
      onClick={isUserAdmin(session.user) ? () => showDetailsOfDay(day) : undefined}
    >
      {format(day, "dd")}
    </div>
  );
};
export default CalendarPastDay;
