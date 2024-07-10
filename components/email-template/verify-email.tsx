import * as React from "react";

interface VerifyEmailTemplateProps {
  verifyLink: string;
}

export const VerifyEmailTemplate: React.FC<
  Readonly<VerifyEmailTemplateProps>
> = ({ verifyLink }) => (
  <div>
    <p>
      Click <a href={verifyLink}>here</a> to verify your email.
    </p>
  </div>
);
