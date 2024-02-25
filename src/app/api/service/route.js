import { verifyJWT } from "@/lib/jwt";
import {
  createService,
  deleteServiceById,
  getServices,
  updateService,
} from "../utils/prisma-queries/service/service.queries";
import {
  DoneResponse,
  UnauthorizedResponse,
  UnavailableResponse,
  UnprocessableEntity,
} from "@/shared/responses";
import { isUserAdmin } from "../utils/auth/verification";

const convertServiceData = (serviceData) => {
  return {
    id: serviceData.id,
    name: serviceData.name,
    price: +serviceData.price,
    duration: +serviceData.duration,
    category: serviceData.category,
  };
};

export async function GET(req) {
  const user = await verifyJWT(req);
  if (!user) return UnauthorizedResponse();

  const { category } = req.nextUrl.searchParams;
  const services = await getServices(category);

  return DoneResponse(services);
}

export const POST = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const { selectedService } = await req.json();
  const service = convertServiceData(selectedService);

  try {
    const createdService = await createService(service);
    if (createdService) return DoneResponse();
  } catch (error) {
    console.error("Create Service Error: ", error);
    return UnavailableResponse();
  }

  return UnprocessableEntity();
};
export const PATCH = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const { selectedService } = await req.json();
  const service = convertServiceData(selectedService);

  try {
    const updatedService = await updateService(service);
    if (updatedService) return DoneResponse();
  } catch (error) {
    console.error("Update Service Error: ", error);
    return UnavailableResponse();
  }

  return UnprocessableEntity();
};

export const DELETE = async (req) => {
  const user = await verifyJWT(req);
  if (!isUserAdmin(user)) return UnauthorizedResponse();

  const { selectedService } = await req.json();

  try {
    const deletedService = await deleteServiceById(selectedService.id);
    if (deletedService) return DoneResponse();
  } catch (error) {
    console.error("Delete Service Error: ", error);
    return UnavailableResponse();
  }

  return UnprocessableEntity();
};
