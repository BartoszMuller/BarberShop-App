import { APPOINTMENTS } from "@/shared/constants/appointments";
import { format } from "date-fns";

export const convertAptsToObject = (appointments) => {
  return appointments?.reduce((result, appointment) => {
    appointment.date = new Date(appointment.date);
    const dateKey = format(appointment.date, "yyyy-MM-dd");

    if (!result[dateKey]) {
      result[dateKey] = [];
      result["aptsNumber"] = {
        ...result["aptsNumber"],
        [dateKey]: 0,
      };
    }
    result["aptsNumber"][dateKey] +=
      appointment.duration / APPOINTMENTS.TIME_IN_MINUTES;
    result[dateKey].push(appointment);

    return result;
  }, {});
};
