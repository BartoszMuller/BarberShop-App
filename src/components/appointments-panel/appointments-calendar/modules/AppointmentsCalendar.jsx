"use client";

import { useContext } from "react";
import styles from "./appointmentsCalendar.module.scss";
import AppointmentsContext from "@/context/appointments-panel/appointments_context";
import { useSession } from "next-auth/react";
import EmptyContent from "@/components/static-statements/EmptyContent";
import { isUserAdmin } from "@/app/api/utils/auth/verification";
import {
  getRenderedAvailableDays,
  getRenderedPastDays,
} from "../utils/renderCalendarDays";
import Loading from "@/components/static-statements/Loading";
import ErrorContent from "@/components/static-statements/ErrorContent";

export const AppointmentsCalendar = () => {
  const {
    onGoToPrevMonth,
    onGoToNextMonth,
    currentMonthData,
    monthNumber,
    todayMonth,
    lastAvailableMonth,
    appointments: groupedApts,
    isLoading,
    isError,
    error,
  } = useContext(AppointmentsContext);

  const { data: session } = useSession();

  const { monthName, pastDays, availableDays } = currentMonthData;

  const appointments = groupedApts[monthNumber];

  if (appointments) {
    return (
      <div className={styles.container}>
        <div className={styles.monthNav}>
          <button
            className={styles.prevMonth}
            onClick={onGoToPrevMonth}
            disabled={!isUserAdmin(session.user) && monthNumber <= todayMonth}
          ></button>
          <div className={styles.title}>{monthName}</div>
          <button
            className={styles.nextMonth}
            onClick={onGoToNextMonth}
            disabled={monthNumber >= lastAvailableMonth}
          ></button>
        </div>
        <div className={styles.headers}>
          <div>Pon</div>
          <div>Wt</div>
          <div>Śr</div>
          <div>Czw</div>
          <div>Pt</div>
        </div>
        <div className={styles.box}>
          {getRenderedPastDays(pastDays)}

          {getRenderedAvailableDays(availableDays)}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    return <ErrorContent />;
  }

  if (appointments === null) {
    return <EmptyContent />;
  }
};
