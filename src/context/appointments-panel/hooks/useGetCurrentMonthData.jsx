import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek, subDays } from "date-fns";
import { setMonth as changeMonth } from "date-fns";
const useGetCurrentMonthData = (today, monthNumber) => {
  const currentSetDate = changeMonth(today, monthNumber);
  const firstDayOfMonth = startOfMonth(currentSetDate);
  const lastDayOfMonth = endOfMonth(currentSetDate);
  const startWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const endWeek = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  const monthName = currentSetDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const pastDays =
    today > startWeek &&
    eachDayOfInterval({
      start: startWeek,
      end: endWeek >= today ? subDays(today, 1) : endWeek,
    });
  const availableDays =
    today < endWeek &&
    eachDayOfInterval({
      start: pastDays ? today : startWeek,
      end: endWeek,
    });

  const currentMonthData = {
    monthName,
    pastDays,
    availableDays,
    startWeek,
    endWeek
  };

  return currentMonthData;
};

export default useGetCurrentMonthData;
