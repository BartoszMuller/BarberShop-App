import { format } from "date-fns";
import styles from "./hours.module.scss";

const DuplicateHour = ({ currentDate }) => {
  return <div className={styles.duplicate}>{format(currentDate, "HH:mm")}</div>;
};
export default DuplicateHour;
