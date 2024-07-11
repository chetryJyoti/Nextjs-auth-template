import * as React from "react";

interface VerifyEmailTemplateProps {
  verifyLink: string;
  type: string;
}

export const VerifyEmailTemplate: React.FC<
  Readonly<VerifyEmailTemplateProps>
> = ({ verifyLink, type }) => (
  <div>
    {type === "resetPassword" ? (
      <p>
        Click <a href={verifyLink}>here</a> to reset your password.
      </p>
    ) : (
      <p>
        Click <a href={verifyLink}>here</a> to verify your email.
      </p>
    )}
  </div>
);
