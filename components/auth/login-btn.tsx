"use client";
import { useRouter } from "next/navigation";
interface LoginBtnProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginBtn = ({
  children,
  mode = "redirect",
  asChild,
}: LoginBtnProps) => {
  const router = useRouter();

  const onClick = () => {
    console.log("login clicked");
    router.push('/auth/login')
  };

  if (mode === "modal") {
    return <span className="text-red-900">TODO: implement modal</span>;
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
