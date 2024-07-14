"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";

const SettingsPage = () => {
  const user = useCurrentUser();
  return <div className="flex items-center justify-center h-full"></div>;
};

export default SettingsPage;
