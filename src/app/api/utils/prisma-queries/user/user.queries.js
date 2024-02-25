import prisma from "@/lib/prisma";
import { ROLES } from "@/shared/constants/roles";
import * as bcrypt from "bcrypt";

export const getUserByEmail = async (userEmail) => {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany({
    where: {
      NOT: {
        role: ROLES.ADMIN,
      },
    },
    select: {
      id: true,
      email: true,
      firstname: true,
      surname: true,
      role: true,
      phoneNumber: true,
      note: true,
    },
  });
};

export const updateUser = async (userData) => {
  let { id: userId, password: userPassword, ...user } = userData;
  userPassword && (user.password = await bcrypt.hash(userPassword, 9));

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: user,
  });
};

export const createUser = async (userData) => {
  let { id: userId, ...user } = userData;
  user.password = await bcrypt.hash(userData.password, 9);
  user.role = userData.role || ROLES.BASIC;

  return await prisma.user.create({
    data: user,
  });
};
