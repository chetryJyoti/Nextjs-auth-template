"use client";
import { useCurrentRole } from "@/hooks/useCurrentUserRole";
import { UserRole } from "@prisma/client";
import React from "react";
import FormError from "../form-error";
interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
}
const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const roles = useCurrentRole();
  console.log({ roles });

  console.log({ allowedRoles });

  if (roles !== allowedRoles) {
    return <FormError message="Unauthorized!" />;
  }
  return <div>{children}</div>;
};

export default RoleGate;
