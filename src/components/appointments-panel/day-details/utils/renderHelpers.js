import { FREE_HOUR } from "@/shared/constants/service";

export const getProperAppointmentNum = (aptsOfSelectedDay, startWorkDate) => {
  let appointmentNumber = 0;
  while (
    aptsOfSelectedDay &&
    aptsOfSelectedDay[appointmentNumber]?.service === FREE_HOUR.name &&
    aptsOfSelectedDay[appointmentNumber].date < startWorkDate
  ) {
    appointmentNumber++;
  }
  return appointmentNumber;
};
