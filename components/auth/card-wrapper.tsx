"use client";
import React from "react";
import { Card, CardHeader, CardFooter, CardContent } from "../ui/card";
import Header from "./header";
import Social from "./social";
import BackBtn from "./back-btn";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLable: string;
  backBtnHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backBtnHref,
  backBtnLable,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackBtn href={backBtnHref} label={backBtnLable} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
