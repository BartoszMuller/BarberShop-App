import { verifyJWT } from "@/lib/jwt";
import {
  BadRequest,
  DoneResponse,
  UnauthorizedResponse,
  UnavailableResponse,
} from "@/shared/responses";
import { APPOINTMENTS } from "@/shared/constants/appointments";
import {
  acceptAptById,
  getUserAptsById,
  rejectAptById,
} from "../utils/prisma-queries/appointment/appointment.queries";
import { MESSAGES, STATUS_TEXT } from "@/shared/responses/status-text";
import { isUserAdmin } from "../utils/auth/verification";
import { differenceInCalendarDays } from "date-fns";

export const GET = async (req) => {
  const user = await verifyJWT(req);
  if (!user) return UnauthorizedResponse();

  const userAppointments = await getUserAptsById(user.id);

  return DoneResponse(userAppointments);
};

export const PATCH = async (req) => {
  const { action, appointment } = await req.json();
  const user = await verifyJWT(req);

  switch (action) {
    case "accept":
      if (!isUserAdmin(user)) return UnauthorizedResponse();

      try {
        await acceptAptById(appointment.id);
        return DoneResponse();
      } catch (error) {
        console.error("Accept UserApt Error: ", error);
        return UnavailableResponse();
      }

    case "reject":
      const daysBeforeAppointment = differenceInCalendarDays(
        new Date(appointment.date),
        new Date()
      );

      if (
        !isUserAdmin(user) &&
        user.id === appointment.userId &&
        daysBeforeAppointment > APPOINTMENTS.REJECT_DAYS_LIMIT
      )
        return BadRequest(
          MESSAGES.REJECTION_BLOCKED,
          STATUS_TEXT.REJECTION_BLOCKED
        );

      try {
        await rejectAptById(appointment.id);
        return DoneResponse();
      } catch (error) {
        console.error("Reject UserApt Error: ", error);
        return UnavailableResponse();
      }
  }
};
