import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./appointmentDetails.module.scss";
import axios from "axios";
import { format } from "date-fns";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { isUserAdmin } from "@/app/api/utils/auth/verification";
import AppointmentsContext from "@/context/appointments-panel/appointments.context";

const AppointmentDetails = (props) => {
  const { data: session } = useSession();
  const { selectedDay } = useContext(AppointmentsContext);
  const queryClient = useQueryClient();

  const { onHideInfo, currentAppointment } = props;

  const { mutate: editAppointment, error } = useMutation({
    mutationFn: async (dataToEdit) => {
      const { data } = await axios.patch("/api/user-appointment", dataToEdit);
      return data;
    },
    onSuccess: () =>
      queryClient.refetchQueries({
        queryKey: ["appointments", `month ${selectedDay.month}`],
      }),
  });

  const appointment = {
    id: currentAppointment.id,
    date: currentAppointment.date,
    userId: currentAppointment.userId,
  };

  const onCancelApt = () => {
    editAppointment({
      action: "reject",
      appointment,
    });
  };
  const onAcceptApt = () => {
    editAppointment({
      action: "accept",
      appointment,
    });
  };

  return (
    <div className={styles.showInfo}>
      <button className={styles.hideInfo} onClick={onHideInfo}></button>

      <div className={styles.dateInfo}>
        <div>{format(currentAppointment.date, "HH:mm")}</div>
        <div>{format(currentAppointment.date, "dd.MM.yyyy")}</div>
      </div>
      <div>
        <div>
          {currentAppointment.user.firstname} {currentAppointment.user.surname}
        </div>
        <div>{currentAppointment.user.phoneNumber}</div>
        <div>{currentAppointment.user.note}</div>
      </div>
      <div>
        <div>{currentAppointment.service}</div>
        <div>Czas: {currentAppointment.duration} minut</div>
        <div>Cena: {currentAppointment.price} zł</div>
        <div>{currentAppointment.note}</div>
      </div>
      {error && (
        <div className={styles.error}>{error.response.data.message}</div>
      )}
      <div className={styles.buttons}>
        <button onClick={onCancelApt}> Odwołaj </button>
        {isUserAdmin(session.user) && !currentAppointment.accepted && (
          <button onClick={onAcceptApt}>Zaakceptuj</button>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
