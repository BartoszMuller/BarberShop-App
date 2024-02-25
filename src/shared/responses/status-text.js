import { APPOINTMENTS } from "../constants/appointments";

export const STATUS_TEXT = {
  REALIZED: "Operation completed successfully",
  TOO_MANY_RESERV: "Too many reservations",
  UNAUTHORIZED: "Unauthorized",
  UNEXPECTED_ERR: "Occurred an unexpected problem ",
  BAD_REQUEST: "Request is invalid",
  COLLISION: "Collision",
  UNAVAILABLE: "Unavailable operation",
  MISSING_DATA: "Data is missing",
  REJECTION_BLOCKED: "Rejection blocked",
};

export const MESSAGES = {
  REALIZED: "Operacja wykonana pomyslnie",
  TOO_MANY_RESERV:
    "Zgłosiłeś zbyt wiele rezerwacji w podanym przedziale czasowym (maksymalnie 1 na 14 dni)",
  UNAUTHORIZED: "Brak upoważnienia",
  UNEXPECTED_ERR: "Wystąpił nieoczekiwany problem",
  BAD_REQUEST: "Niepoprawne żądanie",
  COLLISION: "Kolizja z innymi rezerwacjami!",
  UNAVAILABLE: "Nie udało się wykonać",
  MISSING_DATA: "Brakuje danych do wykonania operacji",
  REJECTION_BLOCKED: `Nie można usunąć rezerwacji. (Najpóźniej ${
    APPOINTMENTS.REJECT_DAYS_LIMIT + 1
  } dni przed wizytą)`,
};
