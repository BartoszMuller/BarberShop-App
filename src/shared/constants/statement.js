export const INFO_STATEMENT = {
  PROVIDE_DATE_OR_SERVICE: (pickedDate, pickedService) => {
    const message = `Wybierz ${!pickedDate ? "datę" : ""}${
      !pickedDate && !pickedService ? " oraz " : ""
    }${!pickedService ? "usługę" : ""}.`;
    return message;
  },
  LOADING: "Ładowanie...",
  EMPTY_CONTENT: "Brak zawartości do wyświetlenia",
};

export const ERROR_STATEMENT = {
  COLLISION: "Czas trwania usługi koliduje z innymi wizytami",
  WORKTIME_LIMIT: "Długość usługi wykracza poza czas pracy",
  FETCH_ERROR: "Błąd podczas pobierania zawartość",
};
