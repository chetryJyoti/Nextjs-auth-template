import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidV4 } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 100);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  //generate a new token
  const newVerificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return newVerificationToken;
};
