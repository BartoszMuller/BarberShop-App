import { verifyJWT } from "@/lib/jwt";
import {
  getPageContent,
  updatePageContent,
} from "../utils/prisma-queries/content/content.queries";
import { DoneResponse, UnauthorizedResponse } from "@/shared/responses";
import { isUserAdmin } from "../utils/auth/verification";

export const GET = async () => {
  const rawContent = await getPageContent();

  let organizedData = {};

  rawContent?.forEach((item) => {
    const { section, name, text } = item;

    if (!organizedData.hasOwnProperty(section)) {
      organizedData = { [section]: {} };
    }

    organizedData[section] = {
      ...organizedData[section],
      [name]: text,
    };
  });

  return DoneResponse(organizedData);
};

export const PATCH = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const contentData = await req.json();
  const errorContent = [];

  await contentData.map(async (content) => {
    try {
      updatePageContent(content);
    } catch (error) {
      errorContent.push(content.name);
    }
  });
  return DoneResponse(errorContent);
};
