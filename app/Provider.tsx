"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

export const Provider = ({
  session,
  children,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
