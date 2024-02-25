"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import TanstackProvider from "./TanstackProvider";

const RootProviders = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <TanstackProvider>{children}</TanstackProvider>
    </SessionProvider>
  );
};

export default RootProviders;
