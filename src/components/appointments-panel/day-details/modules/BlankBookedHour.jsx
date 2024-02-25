import { format } from "date-fns";
import styles from "./hours.module.scss";

const BlankBookedHour = (props) => {
  const { children, currentDate, isCollision } = props;
  return (
    <div
      className={`${isCollision ? styles.pickedHours : ""} ${styles.booked}`}
    >
      {children || format(currentDate, "HH:mm")}
    </div>
  );
};
export default BlankBookedHour;
