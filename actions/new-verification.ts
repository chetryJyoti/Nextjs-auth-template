"use server";

import { getUsersByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {

  const existingToken = await getVerificationTokenByToken(token);


  if (!existingToken) {
    return { error: "Token is invalid!" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Verification token expired!" };
  }

  const existingUser = await getUsersByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      //   in order to generate a new token to verify if the user changes his email id
      email: existingToken.email,
    },
  });
  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "Email verified!" };
};
