import { APPOINTMENTS } from "@/shared/constants/appointments";

export const processAptsToDateTimestamps = (appointments) => {
  const extendedAppointments = appointments?.reduce(
    (processedApts, appointment) => {
      const appointmentDuration =
        appointment.duration / APPOINTMENTS.TIME_IN_MINUTES;
      let appointmentDate_Timestamp = Date.parse(appointment.date);

      for (let i = 0; i < appointmentDuration; i++) {
        processedApts.push(appointmentDate_Timestamp);
        appointmentDate_Timestamp += APPOINTMENTS.TIME_IN_MILLISECONDS;
      }

      return processedApts;
    },
    []
  );

  return extendedAppointments;
};
