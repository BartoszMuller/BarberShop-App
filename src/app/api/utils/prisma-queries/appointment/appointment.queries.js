import { ROLES } from "@/shared/constants/roles";
import { addDays, subDays, endOfDay, startOfDay } from "date-fns";
import prisma from "@/lib/prisma";
import { APPOINTMENTS } from "@/shared/constants/appointments";

export const getAptsInMonth = async (today, startWeek, endWeek) => {
  return await prisma.appointment.findMany({
    where: {
      rejected: false,
      date: {
        gte: startWeek < today ? today : startWeek,
        lte: endWeek < today ? today : endWeek,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstname: true,
          surname: true,
          role: true,
          phoneNumber: true,
          note: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
};

export const getUserAptsAroundDate = async (user, date) => {
  return await prisma.appointment.findMany({
    where: {
      userId: user.id,
      rejected: false,
      date: {
        gte: addDays(
          date,
          -1 * APPOINTMENTS_VALUE.APT_LIMIT_IN_DAYS
        ).toISOString(),
        lte: addDays(date, APPOINTMENTS.APT_LIMIT_IN_DAYS).toISOString(),
      },
    },
  });
};

export const getAptsInInterval = async (startDate, endDate) => {
  return await prisma.appointment.findMany({
    where: {
      rejected: false,
      date: {
        gte: startOfDay(new Date(startDate)),
        lte: endOfDay(new Date(endDate)),
      },
    },
    orderBy: {
      date: "asc",
    },
  });
};

export const getUserAptsById = async (userId) => {
  await prisma.Appointment.findMany({
    where: {
      date: {
        gte: new Date(subDays(new Date(), 7)),
      },
      userId: userId,
    },
    orderBy: {
      date: "asc",
    },
  });
};

export const createApt = async (user, reservData) => {
  return await prisma.appointment.create({
    data: {
      date: reservData.date,
      accepted: user.role === ROLES.ADMIN || user.role === ROLES.TRUSTED,
      duration: +reservData.duration,
      service: reservData.name,
      price: +reservData.price,
      note: reservData.note || "",
      userId: user.id,
    },
  });
};

export const createFreeHour = async (appointment, userId) => {
  return await prisma.appointment.create({
    data: {
      date: new Date(appointment),
      duration: APPOINTMENTS.TIME_IN_MINUTES,
      service: "Godzina wolna",
      price: 0,
      accepted: true,
      userId: userId,
    },
  });
};

export const acceptAptById = async (aptId) => {
  return await prisma.appointment.update({
    where: {
      id: aptId,
    },
    data: {
      accepted: true,
    },
  });
};

export const rejectAptById = async (aptId) => {
  return await prisma.appointment.update({
    where: {
      id: aptId,
    },
    data: {
      rejected: true,
    },
  });
};
