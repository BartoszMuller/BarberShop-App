import { signJwtAccessToken } from "@/lib/jwt";
import * as bcrypt from "bcrypt";
import { getUserByEmail } from "../prisma-queries/user/user.queries";

const login = async (req) => {
  const user = await getUserByEmail(req.email);
  const isPasswordValid = await bcrypt.compare(req.password, user.password);

  if (user && isPasswordValid) {
    const { password, ...userWithoutPass } = user;
    try {
      const accessToken = signJwtAccessToken(userWithoutPass);
      const result = {
        ...userWithoutPass,
        accessToken,
      };
      return result;
    } catch (error) {
      return null;
    }
  }

  return null;
};

export default login;
