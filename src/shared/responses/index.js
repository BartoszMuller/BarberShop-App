import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { MESSAGES, STATUS_TEXT } from "./status-text";

export const UnauthorizedResponse = (customMessage, customStatus) => {
  return NextResponse.json(customMessage ?? MESSAGES.UNAUTHORIZED, {
    status: HttpStatusCode.Unauthorized,
    statusText: customStatus ?? STATUS_TEXT.UNAUTHORIZED,
  });
};

export const UnavailableResponse = (customMessage, customStatus) => {
  return NextResponse.json(customMessage ?? MESSAGES.UNAVAILABLE, {
    status: HttpStatusCode.ServiceUnavailable,
    statusText: customStatus ?? STATUS_TEXT.UNAVAILABLE,
  });
};

export const BadRequest = (customMessage, customStatus) => {
  return NextResponse.json(customMessage ?? MESSAGES.BAD_REQUEST, {
    status: HttpStatusCode.BadRequest,
    statusText: customStatus ?? STATUS_TEXT.BAD_REQUEST,
  });
};

export const UnprocessableEntity = (customMessage, customStatus) => {
  return NextResponse.json(customMessage ?? MESSAGES.UNEXPECTED_ERR, {
    status: HttpStatusCode.UnprocessableEntity,
    statusText: customStatus ?? STATUS_TEXT.UNEXPECTED_ERR,
  });
};

export const DoneResponse = (responseData, customStatus) => {
  return NextResponse.json(responseData ?? MESSAGES.REALIZED, {
    status: HttpStatusCode.Ok,
    statusText: customStatus ?? STATUS_TEXT.REALIZED,
  });
};
