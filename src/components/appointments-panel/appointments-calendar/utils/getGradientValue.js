import { APPOINTMENTS } from "@/shared/constants/appointments";
import { format } from "date-fns";

const getGradientValue = (appointments, day) => {
  const aptsNumber =
    appointments["aptsNumber"] &&
    appointments["aptsNumber"][format(day, "yyyy-MM-dd")];
  if (aptsNumber >= APPOINTMENTS.MAX_IN_DAY) {
    return 0;
  }
  return 100 - (aptsNumber / APPOINTMENTS.MAX_IN_DAY) * 100;
};
export default getGradientValue;
