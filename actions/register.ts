"use server";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUsersByEmail } from "../data/user";
import * as z from "zod";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name } = validatedFields.data;
  const hashedPassoword = await bcrypt.hash(password, 10);
  const existingUser = await getUsersByEmail(email);
  if (existingUser) {
    return { error: "Email already registed!" };
  }
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassoword,
    },
  });

  //Todo: send verifcation token email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
