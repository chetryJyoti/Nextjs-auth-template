import { v4 as uuidV4 } from "uuid";
import crypto from "crypto";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import {
  getTwoFactorTokenByEmail,
  getTwoFactorTokenByToken,
} from "@/data/two-factor-token";

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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1000_000).toString();
  // TODO: CHANGE TO 15mins
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 100);
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  //generate a new token
  const newPasswordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return newPasswordResetToken;
};
