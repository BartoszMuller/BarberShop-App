"use client";

import { APPOINTMENTS } from "@/shared/constants/appointments";
import { ERROR_STATEMENT, INFO_STATEMENT } from "@/shared/constants/statement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addMinutes, isSameMinute } from "date-fns";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const ReservationContextProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [validation, setValidation] = useState({});
  const [isInvalidDate, setIsInvalidDate] = useState(
    INFO_STATEMENT.PROVIDE_DATE_OR_SERVICE()
  );
  const [isSuccessReserv, setIsSuccessReserv] = useState(false);
  const [pickedHours, setPickedHours] = useState([]);
  const [pickedDate, setPickedDate] = useState("");
  const [pickedService, setPickedService] = useState(false);

  const pickDate = (date) => {
    setPickedDate(date);
  };
  const pickService = (service) => {
    setPickedService(service);
  };
  const updateValidation = (data) => {
    setValidation(data);
  };
  const sendReservation = () => {
    const reservData = {
      date: pickedDate,
      name: pickedService.name,
      price: pickedService.price,
      duration: pickedService.duration,
    };

    if (!isInvalidDate) reservAppointment(reservData);
  };

  const postReservation = async (reservData) => {
    const { data } = await axios.post("/api/appointments", reservData);
    return data;
  };
  const resetData = async (response) => {
    queryClient.refetchQueries({
      queryKey: ["appointments", `month ${validation.month}`],
    });
    setIsSuccessReserv(response);
  };
  const showError = ({ response }) => {
    setIsInvalidDate(response?.data);
  };

  const {
    mutate: reservAppointment,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: postReservation,
    onSuccess: resetData,
    onError: showError,
  });

  useEffect(() => {
    setPickedHours([]);
    setIsInvalidDate("");
    setIsSuccessReserv(false);

    if (pickedDate && pickedService) {
      const localDate = new Date(pickedDate);
      for (
        let validationDateCheck = localDate;
        validationDateCheck < addMinutes(localDate, pickedService.duration);
        validationDateCheck = addMinutes(
          validationDateCheck,
          APPOINTMENTS.TIME_IN_MINUTES
        )
      ) {
        const isBooked = validation.selectedAppointments?.find((appointment) =>
          isSameMinute(appointment.date, validationDateCheck)
        );
        const isEndWorkDate = isSameMinute(
          validation.endWorkDate,
          validationDateCheck
        );

        if (isBooked || isEndWorkDate) {
          setIsInvalidDate(
            isBooked
              ? ERROR_STATEMENT.COLLISION
              : ERROR_STATEMENT.WORKTIME_LIMIT
          );
        }
        setPickedHours((prevArray) => {
          return [...prevArray, validationDateCheck.toISOString()];
        });
      }
    } else {
      setIsInvalidDate(
        INFO_STATEMENT.PROVIDE_DATE_OR_SERVICE(pickedDate, pickedService)
      );
    }
  }, [pickedDate, pickedService, validation]);

  const reservationValues = {
    pickedDate,
    pickedService,
    pickedHours,
    isInvalidDate,
    pickDate,
    pickService,
    updateValidation,

    sendReservation,
    isLoading,
    isSuccessReserv,
    isError,
  };

  return (
    <ReservationContext.Provider value={reservationValues}>
      {children}
    </ReservationContext.Provider>
  );
};

const ReservationContext = createContext({
  pickedDate: "",
  pickedService: {},

  isInvalidDate: false,
  pickedHours: [],
  updateValidation: () => {},
  pickDate: () => {},
  pickService: () => {},

  sendReservation: () => {},
  isLoading: false,
  isSuccessReserv: false,
  isError: false,
});
export default ReservationContext;
