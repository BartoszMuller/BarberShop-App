"use client";

import {
  addMinutes,
  eachDayOfInterval,
  format,
  setHours,
  setMinutes,
} from "date-fns";
import styles from "./freeHours.module.scss";
import { useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import SubmitButton from "@/components/form/SubmitButton";
import ResponseMessage from "@/components/form/ResponseMessage";

const FreeHoursPage = () => {
  const [pickedHours, setPickedHours] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    mutate: sendAppointments,
    data: response,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (postData) => {
      const { data } = await axios.post("/api/free-hours", postData);
      return data;
    },
    onSuccess: () => setIsSuccess(true),
  });

  const startDateRef = useRef();
  const endDateRef = useRef();

  const pickDate = (date) => {
    isSuccess && setIsSuccess(false);

    const dateIndex = pickedHours.indexOf(date);
    const isDateInArray = dateIndex !== -1;

    if (isDateInArray) {
      setPickedHours((prevArray) => {
        const newArray = [...prevArray];
        newArray.splice(dateIndex, 1);
        return newArray;
      });
    } else {
      setPickedHours((prevArray) => {
        return [...prevArray, date];
      });
    }
  };

  const onSendData = () => {
    const startDate = new Date(startDateRef.current.value);
    const endDate = new Date(endDateRef.current.value);

    try {
      const dateInterval = eachDayOfInterval({
        start: startDate,
        end: endDate,
      });

      const freeHours = [];

      for (let i = 0; i < dateInterval.length; i++) {
        let appointementDate = dateInterval[i];
        for (let j = 0; j < pickedHours.length; j++) {
          const [hour, minute] = pickedHours[j].split(":");
          appointementDate = setHours(appointementDate, hour);
          appointementDate = setMinutes(appointementDate, minute);
          freeHours.push(appointementDate);
        }
      }

      const freeHoursData = {
        appointmentsToReserv: freeHours,
        startDate,
        endDate,
      };

      sendAppointments(freeHoursData);
    } catch (error) {}
  };

  const startHour = new Date(2005, 4, 2, 7, 0);
  const endHour = new Date(2005, 4, 2, 20, 0);
  const dateList = [];

  for (
    let setDate = startHour;
    setDate < endHour;
    setDate = addMinutes(setDate, 30)
  ) {
    const hourDate = format(setDate, "HH:mm");

    dateList.push(
      <div
        className={`${
          pickedHours.includes(hourDate) ? styles.pickedHours : styles.free
        }`}
        key={hourDate}
        onClick={() => pickDate(hourDate)}
      >
        {hourDate}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Przedział czasowy</div>
        <div className={styles.dateInterval}>
          <div>
            <label>Od</label>
            <input
              ref={startDateRef}
              type="date"
              placeholder="Od"
              name="startDate"
            />
          </div>
          <div>
            <label>Do</label>
            <input
              ref={endDateRef}
              type="date"
              pplaceholder="Do"
              name="endDate"
            />
          </div>
        </div>

        <SubmitButton isLoading={isLoading} onSendData={onSendData} />
        <ResponseMessage response={response} error={error}>
          <>
            <div>Dodano: {response?.message}</div>
            {response?.collisions?.length !== 0 && (
              <>
                <div>Nie udało się dodać:</div>
                <div className={styles.failedList}>
                  {response?.collisions?.map((collisonDate) => (
                    <div key={collisonDate}>
                      {format(new Date(collisonDate), "dd.MM.yyy HH:mm")}
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        </ResponseMessage>
      </div>

      <div
        className={`${styles.box}
         ${isSuccess ? styles.success : ""}`}
      >
        {dateList}
      </div>
    </div>
  );
};

export default FreeHoursPage;
