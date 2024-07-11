"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import CardWrapper from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";

import { resetPassoword } from "../../actions/password-reset";
import { ResetPasswordSchema } from "../../schemas/index";

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    // with api routes
    // axios.post('/your/api/route',values)

    setError("");
    setSuccess("");

    // with server actions
    startTransition(() => {
      resetPassoword(values).then((data) => {
        setError(data?.error);
        //TODO: ADD WHEN 2FA IS IMPL
        setSuccess(data?.success);
        // form.reset();
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backBtnLable="Back to login"
      backBtnHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="test@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <ReloadIcon className="animate-spin" />
            ) : (
              "Send reset email"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
