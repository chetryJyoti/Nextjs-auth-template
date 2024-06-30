"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackBtnProps {
  href: string;
  label: string;
}

function BackBtn({ href, label }: BackBtnProps) {
  return (
    <Button className="font-normal w-full" variant="link" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default BackBtn;
