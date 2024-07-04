import React from "react";
import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Opps! Something went wrong"
      backBtnHref="/auth/login"
      backBtnLable="Back to login"
    >
      <div className="flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive h-10 w-10 " />
      </div>
    </CardWrapper>
  );
}

export default ErrorCard;
