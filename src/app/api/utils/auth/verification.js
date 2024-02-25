import { ROLES } from "@/shared/constants/roles";

export const isUserAdmin = (user) => {
  return user.role === ROLES.ADMIN;
};
