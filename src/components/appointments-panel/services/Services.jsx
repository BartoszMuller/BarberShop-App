"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./services.module.scss";
import axios from "axios";
import { useContext } from "react";
import ReservationContext from "@/context/reservation/reservation.context";
import Loading from "@/components/static-statements/Loading";
import ErrorContent from "@/components/static-statements/ErrorContent";

const Services = () => {
  const { pickService, pickedService } = useContext(ReservationContext);
  const { data: services, isLoading } = useQuery({
    queryKey: [`services`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/service`);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const renderServices = () => {
    return services?.map((service) => (
      <div
        onClick={() => pickService(service)}
        key={service.id}
        className={pickedService.id === service.id ? styles.isPicked : ""}
      >
        {service.name} - {service.price} - {service.category}
      </div>
    ));
  };

  if (isLoading) return <Loading />;
  if (services) {
    return <div className={styles.container}>{renderServices()}</div>;
  }
  return <ErrorContent />;
};

export default Services;
