import { format } from "date-fns";
import styles from "./hours.module.scss";
import { useContext } from "react";
import ReservationContext from "@/context/reservation/reservation.context";

const BookedHourWithDetails = (props) => {
  const { isSuccessReserv } = useContext(ReservationContext);
  const {
    currentAppointment,
    currentDate,
    currentDateKey,
    isPickedDate,
    onShowDetails,
    isCollision,
    children,
  } = props;

  return (
    <div
      className={`${isSuccessReserv ? styles.successReserv : ""}
        ${styles.booked}
        ${isPickedDate ? styles.showDetails : ""}
        ${currentAppointment.accepted ? styles.accepted : styles.toAccept}
        ${isCollision ? styles.collision : ""}`}
      onClick={isPickedDate ? undefined : () => onShowDetails(currentDateKey)}
    >
      {format(currentDate, "HH:mm")}

      {children}
    </div>
  );
};
export default BookedHourWithDetails;
