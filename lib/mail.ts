import { Resend } from "resend";
import { sitePath } from "@/data/config";
import { VerifyEmailTemplate } from "@/components/email-template/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyLink = `${sitePath}/auth/new-verification?token=${token}`;

  const text = `
  Please verify your email by clicking the link below:
  
  ${verifyLink}

  Thank you!`;

  await resend.emails.send({
    from: "Nextjs Auth Template <onboarding@resend.dev>",
    to: email,
    subject: "Nextjs Auth Template: Verify your email",
    react: VerifyEmailTemplate({ verifyLink, type: "" }),
    text: text,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${sitePath}/auth/new-password?token=${token}`;

  const text = `
  Please verify your email by clicking the link below to reset your password:
  
  ${resetLink}

  Thank you!`;

  await resend.emails.send({
    from: "Nextjs Auth Template <onboarding@resend.dev>",
    to: email,
    subject: "Nextjs Auth Template: Reset your password",
    react: VerifyEmailTemplate({
      verifyLink: resetLink,
      type: "resetPassword",
    }),
    text: text,
  });
};
