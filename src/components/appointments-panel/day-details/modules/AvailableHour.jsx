import { format } from "date-fns";
import styles from "./hours.module.scss";
import { useContext } from "react";
import ReservationContext from "@/context/reservation/reservation.context";

const AvailableHour = (props) => {
  const { pickedDate } = useContext(ReservationContext);
  const {
    isCollision,
    isPickedDate,
    currentDate,
    currentDateKey,
    onCheckDate,
  } = props;
  return (
    <div
      className={`${isCollision ? styles.pickedHours : styles.free}
            ${pickedDate === currentDateKey ? styles.pickedDate : ""}`}
      onClick={() => onCheckDate(currentDateKey)}
    >
      {format(currentDate, "HH:mm")}
    </div>
  );
};

export default AvailableHour;
