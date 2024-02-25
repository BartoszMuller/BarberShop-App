"use client";

import styles from "./reservationSummary.module.scss";
import { useContext } from "react";
import ReservationContext from "@/context/reservation/reservation_context";
import { format } from "date-fns";
import { pl } from "date-fns/locale";


const ReservationSummary = () => {
  const {
    pickedDate,
    pickedService,
    isInvalidDate,

    sendReservation,
    isLoading,
    isSuccessReserv,
  } = useContext(ReservationContext);

  const reservationDate =
    pickedDate &&
    format(new Date(pickedDate), "EEEE d MMMM yyyy", { locale: pl });

  let reservButtonMess = "Zarezerwuj";
  if (isLoading) reservButtonMess = "Wysyłanie";
  if (isSuccessReserv) reservButtonMess = "Wysłano!";

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>{isInvalidDate}</div>
        {isInvalidDate && <div className={styles.line}></div>}
      </div>
      <button
        className={`${styles.sumButton} ${
          isSuccessReserv ? styles.success : ""
        }`}
        disabled={isInvalidDate || isSuccessReserv}
        onClick={sendReservation}
      >
        {reservButtonMess}
      </button>
      <div className={styles.date}>{reservationDate}</div>
      <div className={styles.service}>{pickedService.name}</div>
    </div>
  );
};
export default ReservationSummary;
