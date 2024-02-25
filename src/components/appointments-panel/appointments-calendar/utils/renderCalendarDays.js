import { isWeekend } from "date-fns";
import CalendarPastDay from "../modules/CalendarPastDay";
import CalendarAvailableDay from "../modules/CalendarAvailableDay";

export const getRenderedPastDays = (pastDays) => {
  return (
    pastDays &&
    pastDays?.map(
      (day) =>
        !isWeekend(day) && <CalendarPastDay day={day} key={day.toISOString()} />
    )
  );
};

export const getRenderedAvailableDays = (availableDays) => {
  return (
    availableDays &&
    availableDays?.map(
      (day) =>
        !isWeekend(day) && (
          <CalendarAvailableDay day={day} key={day.toISOString()} />
        )
    )
  );
};
