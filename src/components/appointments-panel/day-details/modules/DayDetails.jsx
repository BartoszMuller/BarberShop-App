"use client";

import React, { useContext, useState } from "react";
import styles from "./dayDetails.module.scss";
import AppointmentsContext from "@/context/appointments-panel/appointments_context";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import axios from "axios";
import ReservationContext from "@/context/reservation/reservation_context";
import Loading from "@/components/static-statements/Loading";
import EmptyContent from "@/components/static-statements/EmptyContent";
import { useSession } from "next-auth/react";
import getHoursLayout from "../utils/renderHoursLayout";
import BlankBookedHour from "./BlankBookedHour";
import getDefaultBookedLayout from "../utils/renderDefaultHours";

const DayDetails = () => {
  const {
    pickedHours,
    isInvalidDate,
    isSuccessReserv,
    updateValidation,
    pickDate,
  } = useContext(ReservationContext);

  const { selectedDay, appointments } = useContext(AppointmentsContext);
  const { data: session } = useSession();
  const { date: selectedDate, month: selectedMonth } = selectedDay;

  const [showDetails, setShowDetails] = useState("");
  const { data: workday, isLoading } = useQuery({
    queryKey: [`workday ${selectedDate?.toISOString()}`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/workday`, {
        params: {
          selectedDate: selectedDate?.toISOString(),
        },
      });
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (!workday) {
    return <EmptyContent />;
  } else {
    let workTime = [];

    if (selectedDate && appointments && workday.startHour <= workday.endHour) {
      const [startHour, startMinute] = workday.startHour.split(":");
      const [endHour, endMinute] = workday.endHour.split(":");

      const startWorkDate = new Date(
        selectedDate.setHours(startHour, startMinute)
      );
      const endWorkDate = new Date(selectedDate.setHours(endHour, endMinute));

      const dateIndex = format(selectedDate, "yyyy-MM-dd");
      const aptsOfSelectedDay = appointments[selectedMonth]?.[dateIndex];

      const onCheckDate = (date) => {
        updateValidation({ aptsOfSelectedDay, endWorkDate, ...selectedDay });
        pickDate(date);
      };
      const onShowDetails = (dateISO) => {
        setShowDetails(dateISO);
      };
      const onHideInfo = () => {
        setShowDetails("");
      };

      workTime = getHoursLayout(
        session,
        aptsOfSelectedDay,
        startWorkDate,
        endWorkDate,
        pickedHours,
        showDetails,
        onShowDetails,
        onHideInfo,
        onCheckDate
      );

      if (startMinute === "30")
        workTime.unshift(
          <BlankBookedHour key="startBlank">
            {`${startHour}:00`}
          </BlankBookedHour>
        );
      if (endMinute === "30")
        workTime.push(
          <BlankBookedHour key="endBlank">
            {endHour}:{endMinute}
          </BlankBookedHour>
        );
    } else {
      workTime = getDefaultBookedLayout();
    }

    return (
      <div className={styles.container}>
        <div
          className={`${styles.box}
                  ${isInvalidDate ? styles.invalid : ""}
                  ${isSuccessReserv ? styles.success : ""}`}
        >
          {workTime}
        </div>
      </div>
    );
  }
};

export default DayDetails;
