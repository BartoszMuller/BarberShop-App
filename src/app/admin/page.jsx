"use client";

import styles from "../panel/panel.module.scss";
import AppointmentsPanelProvider from "@/providers/AppointmentsPanelProvider";
import { AppointmentsCalendar } from "@/components/appointments-panel/appointments-calendar/modules/AppointmentsCalendar";
import ReservationSummary from "@/components/appointments-panel/reservation-summary/ReservationSummary";
import DayDetails from "@/components/appointments-panel/day-details/modules/DayDetails";
import Services from "@/components/appointments-panel/services/Services";
import CustomService from "@/components/appointments-panel/services/admin/CustomService";

const AdminPage = () => {
  return (
    <AppointmentsPanelProvider>
      <div className={styles.container}>
        <div className={styles.reservBox}>
          <div className={styles.wrapper}>
            <div className={styles.appointments}>
              <AppointmentsCalendar />
            </div>

            <div className={styles.summary}>
              <ReservationSummary />
            </div>
          </div>

          <div className={styles.daydetails}>
            <DayDetails />
          </div>

          <div className={styles.services}>
            <Services />
            <CustomService />
          </div>
        </div>
      </div>
    </AppointmentsPanelProvider>
  );
};

export default AdminPage;
