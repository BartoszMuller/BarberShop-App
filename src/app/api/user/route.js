import { verifyJWT } from "@/lib/jwt";
import {
  BadRequest,
  DoneResponse,
  UnauthorizedResponse,
  UnavailableResponse,
} from "@/shared/responses";
import { MESSAGES, STATUS_TEXT } from "@/shared/responses/status-text";
import {
  createUser,
  getUsers,
  updateUser,
} from "../utils/prisma-queries/user/user.queries";
import { isUserAdmin } from "../utils/auth/verification";

const isUserDataInvalid = (userData) => {
  return !userData.email || !userData.firstname || !userData.surname;
};

export const GET = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const users = await getUsers();
  return DoneResponse(users);
};

export const POST = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const { userData } = await req.json();

  if (isUserDataInvalid(userData))
    return BadRequest(MESSAGES.MISSING_DATA, STATUS_TEXT.MISSING_DATA);

  try {
    await createUser(userData);
    return DoneResponse();
  } catch (error) {
    console.error("CreateUser", error);
    return UnavailableResponse();
  }
};

export const PATCH = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const userData = await req.json();

  if (isUserDataInvalid(userData))
    return BadRequest(MESSAGES.MISSING_DATA, STATUS_TEXT.MISSING_DATA);

  try {
    await updateUser(userData);
    return DoneResponse();
  } catch (error) {
    console.error("UpdateUser", error);
    return UnavailableResponse();
  }
};
