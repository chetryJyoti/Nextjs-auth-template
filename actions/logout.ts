"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // DO SOMETHING BEFORE LOGGING OUT YOUR WISH
  await signOut();
};
