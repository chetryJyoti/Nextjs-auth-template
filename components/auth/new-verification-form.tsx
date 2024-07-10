"use client";
import { useSearchParams } from "next/navigation";
import { BarLoader } from "react-spinners";
import { useCallback, useEffect } from "react";
import CardWrapper from "./card-wrapper";

function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    console.log("token:", token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      <CardWrapper
        headerLabel="Confirming your email verification"
        backBtnHref="/auth/login"
        backBtnLable="Back to login"
      >
        <div className="flex items-center justify-center">
          <BarLoader />
        </div>
      </CardWrapper>
    </div>
  );
}

export default NewVerificationForm;
