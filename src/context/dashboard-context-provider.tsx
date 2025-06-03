"use client"
import { createContext, useState, type ReactNode } from "react";
export const DashboardContext = createContext<any>(null);
const DashboardContextProvider = ({ children }: { children: ReactNode }) => {
  const [startRecording, setStartRecording] = useState(false);
  return (
    <DashboardContext.Provider value={{ startRecording, setStartRecording }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
