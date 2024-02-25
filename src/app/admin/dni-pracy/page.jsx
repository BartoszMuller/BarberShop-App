"use client";

import styles from "./workdays.module.scss";
import { useRef } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import SubmitButton from "@/components/form/SubmitButton";
import ResponseMessage from "@/components/form/ResponseMessage";

const WorkdaysPage = () => {
  const {
    mutate: sendAppointments,
    data: response,
    error,
    isLoading,
  } = useMutation({
    mutationFn: async (workdayData) => {
      const { data } = await axios.post("/api/workday", workdayData);
      return data;
    },
  });

  const startDateRef = useRef();
  const endDateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();

  const onSendData = () => {
    const workdayData = {
      startDate: new Date(startDateRef.current.value),
      endDate: new Date(endDateRef.current.value),
      startTime: startTimeRef.current.value,
      endTime: endTimeRef.current.value,
    };

    sendAppointments(workdayData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.intervals}>
          <div className={styles.timeInterval}>
            <div className={styles.title}>Godziny pracy</div>
            <div>
              <label>Od</label>{" "}
              <input ref={startTimeRef} type="time" name="startTime" />
            </div>
            <div>
              <label>Do</label>{" "}
              <input ref={endTimeRef} type="time" name="endTime" />
            </div>
          </div>
          <div className={styles.dateInterval}>
            <div className={styles.title}>Przedział czasowy</div>
            <div>
              <label>Od</label>{" "}
              <input ref={startDateRef} type="date" name="startDate" />
            </div>
            <div>
              <label>Do</label>{" "}
              <input ref={endDateRef} type="date" name="endDate" />
            </div>
          </div>
        </div>
        <ResponseMessage response={response} error={error} />
        <SubmitButton isLoading={isLoading} onSendData={onSendData} />
      </div>
    </div>
  );
};
export default WorkdaysPage;
