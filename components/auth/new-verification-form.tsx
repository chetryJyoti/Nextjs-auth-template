"use client";
import { useSearchParams } from "next/navigation";
import { BarLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { newVerification } from "@/actions/new-verification";
import FormError from "../form-error";
import FormSuccess from "../form-success";

function NewVerificationForm() {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

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
          {!error && !success && <BarLoader />}
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </CardWrapper>
    </div>
  );
}

export default NewVerificationForm;
