"use client";

import { useState } from "react";
import styles from "../uzytkownicy/dataManagementPanel.module.scss";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EMPTY_SERVICE } from "@/shared/constants/service";
import InputForm from "@/components/form/InputForm";
import RenderList from "@/components/admin_panel/data-management-panel/search-panel/SearchList";
import AddNewElement from "@/components/admin_panel/data-management-panel/search-panel/AddNewElement";
import ResponseMessage from "@/components/form/ResponseMessage";

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(EMPTY_SERVICE);

  const actionType = selectedService.id ? "update" : "create";

  const {
    mutate: sendServiceData,
    error,
    data: response,
  } = useMutation({
    mutationFn: async (postData) => {
      if (actionType === "create") {
        await axios.post("/api/service", postData);
      } else if (actionType === "update") {
        const { data } = await axios.patch(`/api/service`, postData);
        return data;
      }
    },
  });

  const onChangeServiceData = (e) => {
    setSelectedService((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSelectService = (service) => {
    setSelectedService(service);
  };

  const submitService = () => {
    const serviceData = {
      selectedService,
    };
    sendServiceData(serviceData);
  };

  const { data: services, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: async () => {
      const { data } = await axios.get("/api/service");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchPanel}>
          <AddNewElement
            onAddNewElement={onSelectService}
            currentSelectedId={selectedService.id}
          >
            Dodaj nowego użytkownika
          </AddNewElement>
          <RenderList
            dataToRender={["name", "price", "duration", "category"]}
            isLoading={isLoading}
            listToRender={services}
            currentSelectedId={selectedService.id}
            onSelectElement={onSelectService}
          />
        </div>
        <div className={styles.dataManagementPanel}>
          <div className={styles.title}>
            <div>Dodawanie usługi</div>
          </div>

          <div className={styles.dataWrapper}>
            <div className={styles.data}>
              <InputForm
                key="name"
                label={"Nazwa"}
                name={"name"}
                onChange={(e) => onChangeServiceData(e)}
                value={selectedService.name}
              />
              <InputForm
                key="price"
                label={"Cena"}
                name={"price"}
                onChange={(e) => onChangeServiceData(e)}
                value={selectedService.price}
              />
              <InputForm
                key="duration"
                label={"Czas"}
                name={"duration"}
                onChange={(e) => onChangeServiceData(e)}
                value={selectedService.duration}
              />
              <InputForm
                key="category"
                label={"Kategoria"}
                name={"category"}
                onChange={(e) => onChangeServiceData(e)}
                value={selectedService.category}
              />
            </div>
          </div>

          <div className={styles.submit}>
            {selectedService.id ? (
              <button onClick={submitService}>
                {" "}
                Edytuj usługę <img src="/images/edit.svg" />{" "}
              </button>
            ) : (
              <button onClick={submitService}>
                {" "}
                Dodaj usługę <img src="/images/login.svg" />{" "}
              </button>
            )}
          </div>

         <ResponseMessage response={response} error={error} />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
