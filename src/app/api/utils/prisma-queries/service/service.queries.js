import prisma from "@/lib/prisma";

export const getServices = async (categoryName) => {
  const service = await prisma.service.findMany({
    where: {
      category: categoryName || { in: ["on", "ona"] },
    },
    orderBy: {
      category: "asc",
    },
  });

  return service;
};

export const createService = async (service) => {
  return await prisma.service.create({
    data: service,
  });
};

export const updateService = async (service) => {
  const { id: serviceId, ...serviceData } = service;
  return await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: {
      ...serviceData,
    },
  });
};

export const deleteServiceById = async (serviceId) => {
  return await prisma.service.delete({
    where: {
      id: serviceId,
    },
  });
};
