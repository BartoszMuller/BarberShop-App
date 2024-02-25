import { verifyJWT } from "@/lib/jwt";
import { setHours } from "date-fns";
import {
  BadRequest,
  DoneResponse,
  UnauthorizedResponse,
  UnavailableResponse,
} from "@/shared/responses";
import {
  createWorkday,
  getDefaultWorkday,
  getWorkday,
} from "../utils/prisma-queries/workday/workday.queries";
import { isUserAdmin } from "../utils/auth/verification";

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return UnauthorizedResponse();

  const { selectedDate } = req.nextUrl.searchParams;
  const formattedDate = setHours(new Date(selectedDate), 16);

  const workday = selectedDate
    ? (await getWorkday(formattedDate)) || (await getDefaultWorkday())
    : await getDefaultWorkday();
  return DoneResponse(workday);
}
export const POST = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const workday = await req.json();
  if (!workday) return BadRequest();

  const startMinute = workday.startTime.split(":")[1];
  const endMinute = workday.endTime.split(":")[1];

  if (
    startMinute % 30 !== 0 ||
    endMinute % 30 !== 0 ||
    !workday.startDate ||
    !workday.endDate ||
    workday.startDate > workday.endDate
  )
    return BadRequest();

  try {
    await createWorkday(workday);
    return DoneResponse();
  } catch (error) {
    console.error("Workday ERROR: ", error);
    return UnavailableResponse();
  }
};
