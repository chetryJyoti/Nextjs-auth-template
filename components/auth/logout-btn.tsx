"use client";

interface LogoutBtnProps {
  children?: React.ReactNode;
}
import { logout } from "@/actions/logout";
import React from "react";

function LogoutBtn({ children }: LogoutBtnProps) {
  const onClick = () => {
    logout();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export default LogoutBtn;
