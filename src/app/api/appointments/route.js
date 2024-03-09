import { verifyJWT } from "@/lib/jwt";
import {
  DoneResponse,
  UnauthorizedResponse,
  UnprocessableEntity,
} from "@/shared/responses";
import { MESSAGES, STATUS_TEXT } from "@/shared/responses/status-text";
import {
  createApt,
  getAptsInInterval,
  getAptsInMonth,
} from "../utils/prisma-queries/appointment/appointment.queries";
import { isUserAdmin } from "../utils/auth/verification";
import { processAptsToDateTimestamps } from "../utils/process-data/appointments";

const filterAppointments = (appointments, user) => {
 return appointments?.map((appointment) => {
    if (appointment.userId === user.id) {
      const { user, ...appointmentWithoutUserData } = appointment;
      return {
        ...appointmentWithoutUserData,
        user: {
          firstname: user.firstname,
          surname: user.surname,
        },
      };
    } else {
      return {
        date: appointment.date,
        service: appointment.service,
        duration: appointment.duration,
      };
    }
  });
};

export const GET = async (req) => {
  const user = await verifyJWT(req);

  if (!user) return UnauthorizedResponse();

  const { monthNumber, startWeek, endWeek } = req.nextUrl.searchParams;
  const today = new Date();

  if (monthNumber < today.getMonth()) {
    if (isUserAdmin(user)) {
      today.setFullYear(today.getFullYear() - 1);
    } else {
      return UnauthorizedResponse();
    }
  }

  const recivedAppointments = await getAptsInMonth(today, startWeek, endWeek);

  const appointmentsToResponse = isUserAdmin(user)
    ? recivedAppointments
    : filterAppointments(recivedAppointments, user);

  return DoneResponse(appointmentsToResponse);
};

export const POST = async (req) => {
  const user = await verifyJWT(req);
  if (!user) return UnauthorizedResponse();

  const reservData = await req.json();
  const formatedPickedDate = new Date(reservData.date);
  const userAptsInMonth = isUserAdmin(user)
    ? []
    : await getUserAptsAroundDate(user, formatedPickedDate);

  if (userAptsInMonth.length !== 0) {
    return UnprocessableEntity(
      MESSAGES.TOO_MANY_RESERV,
      STATUS_TEXT.TOO_MANY_RESERV
    );
  }

  const aptsInReservDay = await getAptsInInterval(
    formatedPickedDate,
    formatedPickedDate
  );

  const bookedDates = processAptsToDateTimestamps(aptsInReservDay);

  const reservDates = processAptsToDateTimestamps([reservData]);

  const collisions = reservDates.filter((appointmentHour) =>
    bookedDates.includes(appointmentHour)
  );

  if (collisions.length !== 0) {
    return UnprocessableEntity(MESSAGES.COLLISION, STATUS_TEXT.COLLISION);
  }
  const createdAppointment = await createApt(user, reservData);

  return createdAppointment ? DoneResponse() : UnprocessableEntity();
};
