import prisma from "@/lib/prisma";

export const getPageContent = async () => {
  return await prisma.content.findMany({});
};

export const updatePageContent = async (content) => {
  await prisma.content.update({
    where: {
      name: content.name,
    },
    data: {
      text: content.text,
    },
  });
};
