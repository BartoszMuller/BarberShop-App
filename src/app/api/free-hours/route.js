import { verifyJWT } from "@/lib/jwt";
import {
  createFreeHour,
  getAptsInInterval,
} from "../utils/prisma-queries/appointment/appointment.queries";
import { DoneResponse, UnauthorizedResponse } from "@/shared/responses";
import { isUserAdmin } from "../utils/auth/verification";
import { processAptsToDateTimestamps } from "../utils/process-data/appointments";

export const POST = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const { appointmentsToReserv, startDate, endDate } = await req.json();

  const aptsInInterval = await getAptsInInterval(startDate, endDate);

  const bookedDates =
    aptsInInterval && processAptsToDateTimestamps(aptsInInterval);
  const reservDates = appointmentsToReserv?.map((appointment) =>
    Date.parse(appointment)
  );

  const collisions = [];
  let addedApts = 0;

  for (const appointment of reservDates) {
    if (bookedDates.includes(appointment)) {
      collisions.push(appointment);
    } else {
      try {
        const createdReserv = await createFreeHour(appointment, user.id);
        if (createdReserv) addedApts++;
      } catch (error) {
        console.error("Free hours Error: ", error);
      }
    }
  }

  const message = addedApts + "/" + appointmentsToReserv.length;

  return DoneResponse({ message, collisions });
};
