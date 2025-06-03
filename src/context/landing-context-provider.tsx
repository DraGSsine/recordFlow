"use client"
import React, { useState, type ReactNode } from "react";
import { createContext } from "react";
export const LandingContext = createContext<{
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (value: boolean) => void;
}>({
  isAuthModalOpen: false,
  setIsAuthModalOpen: () => {}
});
const LandingContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  return (
    <LandingContext.Provider value={{ isAuthModalOpen, setIsAuthModalOpen }}>
      {children}
    </LandingContext.Provider>
  );
};

export default LandingContextProvider;
