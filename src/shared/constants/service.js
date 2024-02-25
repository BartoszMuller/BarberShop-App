import { APPOINTMENTS } from "./appointments";

export const EMPTY_SERVICE = {
  id: "",
  name: "",
  price: 0,
  duration: APPOINTMENTS.TIME_IN_MINUTES,
  category: "",
};

export const CUSTOM_SERVICE = {
  id: "custom",
  note: "",
  duration: APPOINTMENTS.TIME_IN_MINUTES,
  name: "",
  price: "",
  email: "",
};

export const FREE_HOUR = {
  id: "",
  note: "",
  duration: APPOINTMENTS.TIME_IN_MINUTES,
  name: "Godzina wolna",
  price: "",
  email: "",
};
