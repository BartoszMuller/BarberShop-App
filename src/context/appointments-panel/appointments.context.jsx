"use client";

import { startOfDay } from "date-fns";
import { createContext, useState } from "react";
import { useSession } from "next-auth/react";
import { isUserAdmin } from "@/app/api/utils/auth/verification";
import useGetAppointments from "./hooks/useGetAppointments";
import useGetCurrentMonthData from "./hooks/useGetCurrentMonthData";

export const AppointmentsContextProvider = ({ children }) => {
  const { data: session } = useSession();

  const today = startOfDay(new Date(2024, 1, 7));
  const todayMonth = today.getMonth();

  const [monthNumber, setMonthNumber] = useState(todayMonth);
  const [selectedDay, setSelectedDay] = useState({
    date: undefined,
    month: todayMonth,
  });

  const showDetailsOfDay = (date) => {
    setSelectedDay({
      date,
      month: monthNumber,
    });
  };

  const lastAvailableMonth = todayMonth + 5;
  const onGoToPrevMonth = () => {
    if (monthNumber > todayMonth || isUserAdmin(session.user)) {
      setMonthNumber((prevValue) => prevValue - 1);
    }
  };
  const onGoToNextMonth = () => {
    if (monthNumber < lastAvailableMonth || isUserAdmin(session.user)) {
      setMonthNumber((prevValue) => prevValue + 1);
    }
  };

  const currentMonthSet = useGetCurrentMonthData(today, monthNumber);

  const { groupedAppointments, isLoading, isError, error } = useGetAppointments(
    monthNumber,
    currentMonthSet.startWeek,
    currentMonthSet.endWeek,
    selectedDay
  );

  const contextValues = {
    selectedDay,
    currentMonthSet,
    appointments: groupedAppointments,
    todayMonth,
    lastAvailableMonth,
    monthNumber,
    isLoading,
    isError,
    error,
    onGoToPrevMonth,
    onGoToNextMonth,
    showDetailsOfDay,
  };

  return (
    <AppointmentsContext.Provider value={contextValues}>
      {children}
    </AppointmentsContext.Provider>
  );
};

const AppointmentsContext = createContext({
  selectedDay: {},
  currentMonthSet: {},
  appointments: {},
  todayMonth: 0,
  lastAvailableMonth: 0,
  monthNumber: 0,
  isLoading: false,
  isError: false,
  error: {},
  onGoToPrevMonth: () => {},
  onGoToNextMonth: () => {},
  showDetailsOfDay: () => {},
});
export default AppointmentsContext;
