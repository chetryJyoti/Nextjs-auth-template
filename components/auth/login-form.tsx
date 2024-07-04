"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { LoginSchema } from "@/schemas";
import CardWrapper from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const linkedError =
    searchParams.get("error") == "OAuthAccountNotLinked"
      ? "Email already registered with other providers"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // with api routes
    // axios.post('/your/api/route',values)

    setError("");
    setSuccess("");

    // with sever actions
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        //TODO: ADD WHEN 2FA IS IMPL
        // setSuccess(data?.success);
        // form.reset();
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backBtnLable="Don't have an account? Register now"
      backBtnHref="/auth/register"
      showSocial
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="**********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error || linkedError} />
            <FormSuccess message={success} />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? <ReloadIcon className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
