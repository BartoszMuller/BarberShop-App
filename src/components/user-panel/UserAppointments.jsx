import { format } from "date-fns";
import styles from "./userAppointments.module.scss";

const userAppointments = (props) => {
  const { title, appointments } = props;

  const renderUserAppointments = () => {
    return appointments?.map((appointment) => (
      <div key={appointment.id} className={styles.details}>
        <div>{format(new Date(appointment.date), "HH:mm dd.MM.yyyy")}</div>

        <div>
          <div>{appointment.service}</div>
          <div>Czas: {appointment.duration}</div>
        </div>
      </div>
    ));
  };
  
  return (
    <div className={styles.group}>
      <div className={styles.title}>{title}</div>
      <div className={styles.list}>{renderUserAppointments()}</div>
    </div>
  );
};
export default userAppointments;
