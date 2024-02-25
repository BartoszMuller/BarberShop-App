import prisma from "@/lib/prisma";
import { endOfDay } from "date-fns";

export const getWorkday = async (selectedDate) => {
  return await prisma.workday.findFirst({
    where: {
      fromdate: { lte: selectedDate },
      todate: { gte: selectedDate },
    },
  });
};

export const getDefaultWorkday = async () => {
  return await prisma.workday.findFirst({
    where: {
      isCurrent: true,
    },
  });
};

export const createWorkday = async (workday) => {
  return await prisma.workday.create({
    data: {
      isCurrent: false,
      fromdate: new Date(workday.startDate),
      todate: endOfDay(new Date(workday.endDate)),
      startHour: workday.startTime,
      endHour: workday.endTime,
    },
  });
};
