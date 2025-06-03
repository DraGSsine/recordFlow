"use client"
import DashboardContextProvider from "@/context/dashboard-context-provider";
import LandingContextProvider from "@/context/landing-context-provider";
import React, { type ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardContextProvider>
      <LandingContextProvider>{children}</LandingContextProvider>
    </DashboardContextProvider>
  );
};

export default Providers;
