"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";

const SettingsPage = () => {
  const user = useCurrentUser();
  return <div className="flex items-center justify-center h-full"></div>;
};

export default SettingsPage;
