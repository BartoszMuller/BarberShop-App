"use client";

import { AppointmentsContextProvider } from "@/context/appointments-panel/appointments.context";
import { ReservationContextProvider } from "@/context/reservation/reservation.context";
import TanstackProvider from "@/providers/TanstackProvider";

const AppointmentsPanelProvider = ({ children }) => {
  return (
    <TanstackProvider>
      <AppointmentsContextProvider>
        <ReservationContextProvider>{children}</ReservationContextProvider>
      </AppointmentsContextProvider>
    </TanstackProvider>
  );
};
export default AppointmentsPanelProvider;
