"use client";

import UserAppointments from "@/components/user-panel/UserAppointments";
import styles from "./moje-konto.module.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmptyContent from "@/components/static-statements/EmptyContent";
import Loading from "@/components/static-statements/Loading";

const MyAccount = () => {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["userAppointments"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user-appointment`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (appointments) {
    console.log(appointments);
    const userApts = {
      rejected: [],
      waiting: [],
      accepted: [],
    };
    appointments?.map((wizyta) => {
      wizyta.date = new Date(wizyta.date);

      if (wizyta.rejected === true) {
        userApts.rejected.push(wizyta);
      } else if (wizyta.accepted === false) {
        userApts.waiting.push(wizyta);
      } else {
        userApts.accepted.push(wizyta);
      }
    });

    return (
      <div className={styles.container}>
        <UserAppointments
          title={"Odrzucone"}
          appointments={userApts.rejected}
        ></UserAppointments>
        <UserAppointments
          title={"Oczekujące"}
          appointments={userApts.waiting}
        ></UserAppointments>
        <UserAppointments
          title={"Zaakceptowane"}
          appointments={userApts.accepted}
        ></UserAppointments>
      </div>
    );
  } else {
    return <EmptyContent />;
  }
};
export default MyAccount;
