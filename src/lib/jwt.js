import { getUserByEmail } from "@/app/api/utils/prisma-queries/user/user.queries";
import { verify, sign } from "jsonwebtoken";

const key = process.env.SECRET_KEY;

export const signJwtAccessToken = (payload) => {
  const token = sign(payload, key);
  return token;
};

export const verifyJWT = async (req) => {
  const token = req.headers.get("authorization");
  try {
    const tokenData = verify(token, key);
    const { password, ...user } = await getUserByEmail(tokenData.email);
    return user;
  } catch (error) {
    return null;
  }
};
