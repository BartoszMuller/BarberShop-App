import { APPOINTMENTS } from "@/shared/constants/appointments";
import { addMinutes, format } from "date-fns";
import BlankBookedHour from "../modules/BlankBookedHour";

const getDefaultBookedLayout = () => {
  const workTime = [];

  let startWorkDate = new Date(new Date().setHours(8, 0));
  const endWorkDate = new Date(new Date().setHours(16, 0));

  while (startWorkDate < endWorkDate) {
    const currentDateKey = startWorkDate.toISOString();
    workTime.push(
      <BlankBookedHour key={currentDateKey} currentDate={startWorkDate} />
    );
    startWorkDate = addMinutes(startWorkDate, APPOINTMENTS.TIME_IN_MINUTES);
  }

  return workTime;
};

export default getDefaultBookedLayout;
