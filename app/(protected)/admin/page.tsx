"use client";
import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";

import React from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((respose) => {
      if (respose.ok) {
        toast.success("Allowed!");
      } else {
        toast.error("Forbidden!");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔐 Admin</p>
      </CardHeader>
      <CardContent>
        <RoleGate allowedRoles={UserRole.ADMIN}>
          <FormSuccess message="Ony ADMIN is Authorized to view this content" />
        </RoleGate>
        <div className="border shadow-md p-4 my-4 flex justify-between items-center">
          <p className="font-medium text-sm">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="border shadow-md p-4 my-4 flex justify-between items-center">
          <p className="font-medium text-sm">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
