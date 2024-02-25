"use client";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  subDays,
  startOfDay,
} from "date-fns";
import { setMonth as changeMonth } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { isUserAdmin } from "@/app/api/utils/auth/verification";
import { convertAptsToObject } from "./utils/query";

export const AppointmentsContextProvider = ({ children }) => {
  const { data: session } = useSession();

  const today = startOfDay(new Date());
  const todayMonth = today.getMonth();

  const [monthNumber, setMonthNumber] = useState(todayMonth);
  const [groupedAppointments, setGroupedAppointments] = useState({});
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
  };

  const getAppointments = async () => {
    const { data } = await axios.get(`/api/appointments`, {
      params: {
        monthNumber,
        startWeek: startWeek?.toISOString(),
        endWeek: endWeek?.toISOString(),
      },
    });
    return data;
  };
  console.log(groupedAppointments)

  const sortAppointments = (appointments, selectedDay) => {
    const sortedAppointments = convertAptsToObject(appointments);

    const selectedMonth = selectedDay?.month;

    setGroupedAppointments((prevArray) => {
      let newGroupedApts = { ...prevArray };
      newGroupedApts[selectedMonth || monthNumber] = sortedAppointments;
      return newGroupedApts;
    });
  };

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ["appointments", `month ${monthNumber}`],
    queryFn: getAppointments,
    onSuccess: sortAppointments,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const selectedDayObserver = useQuery({
    queryKey: ["appointments", `month ${selectedDay.month}`],
    onSuccess: (appointments) => sortAppointments(appointments, selectedDay),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!groupedAppointments[monthNumber]) refetch();
  }, [monthNumber]);

  const contextValues = {
    selectedDay,
    currentMonthData,
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
    sortAppointments,
  };

  return (
    <AppointmentsContext.Provider value={contextValues}>
      {children}
    </AppointmentsContext.Provider>
  );
};

const AppointmentsContext = createContext({
  selectedDay: {},
  currentMonthData: {},
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
  sortAppointments: () => {},
});
export default AppointmentsContext;
