"use client"
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import UserProfileDropdown from "./dashboard/user-profile-dropdown";
import { LandingContext } from "@/context/landing-context-provider";
import Link from "next/link";
import Image from "next/image";

export const LandingNavBar = () => {
  const { setIsAuthModalOpen } = useContext(LandingContext)

  return (
    <nav className="flex justify-between items-center bg-card rounded-full py-3 px-8 mx-1 ">
      <div className=" gap-2 flex items-center">
        <Image alt="website logo" width={30} height={30} className=" h-12 w-12" src="/logo.png" />
        <span className=" font-bold text-2xl">
          Record
          <span className="  bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text  ">
            Flow
          </span>
        </span>
      </div>
      <Tabs defaultValue="Home">
        <TabsList>
          <Link href="/">
            <TabsTrigger value="Home">Home</TabsTrigger>
          </Link>
          <Link href="/#features">
            <TabsTrigger value="Features">Features</TabsTrigger>
          </Link>
          <Link href="/#pricing">
            <TabsTrigger value="Pricing">Pricing</TabsTrigger>
          </Link>
          <Link href="/#support">
            <TabsTrigger value="Support">Support</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      <div className=" space-x-4">
        <Button
          onClick={() => setIsAuthModalOpen(true)}
          variant="ghost"
          className=" rounded-full"
        >
          Login
        </Button>
        <Button
          onClick={() => setIsAuthModalOpen(true)}
          variant="default"
          className=" text-white rounded-full"
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export const DashboardNavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-card rounded-full py-3 px-8 mx-1 ">
      <div className=" gap-2 flex items-center">
        <img className=" h-12 w-12" src="/logo.png" />
        <span className=" font-bold text-2xl">
          Record
          <span className="  bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text  ">
            Flow
          </span>
        </span>
      </div>
      <div className=" flex gap-4 items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-2xl border">
          <div className="flex items-center gap-1 text-sm font-medium">
            <span className="text-muted-foreground">0</span>
            <span className="text-muted-foreground">/</span>
            <span>1</span>
            <span className="text-muted-foreground">videos</span>
          </div>
          <div className="w-16 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: '0%' }} />
          </div>
        </div>
        <UserProfileDropdown />
      </div>
    </nav>
  );
};
