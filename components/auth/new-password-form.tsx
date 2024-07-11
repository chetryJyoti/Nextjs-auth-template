"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

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

import { NewPasswordSchema } from "../../schemas/index";
import { newPassword } from "../../actions/new-password";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    // with api routes
    // axios.post('/your/api/route',values)

    setError("");
    setSuccess("");

    // with server actions
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        //TODO: ADD WHEN 2FA IS IMPL
        setSuccess(data?.success);
        // form.reset();
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backBtnLable="Back to login"
      backBtnHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" />
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
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
