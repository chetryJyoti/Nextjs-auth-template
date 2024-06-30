"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register = async (values: any) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};
