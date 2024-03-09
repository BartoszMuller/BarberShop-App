import axios from "axios";
import { convertAptsToObject } from "./utils/query";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useGetAppointments = (monthNumber, startWeek, endWeek, selectedDay) => {
  const [groupedAppointments, setGroupedAppointments] = useState([]);

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

  return { groupedAppointments, isLoading, isError, error };
};
export default useGetAppointments;
