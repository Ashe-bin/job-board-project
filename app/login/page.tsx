import { LoginForm } from "@/components/forms/LoginForm";
import { LogoIcon } from "@/components/icons/icons";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-lg flex-col gap-6 items-center ">
        <Link href="/" className="flex items-center gap-2 ">
          <LogoIcon width={40} height={40} />
          <h1 className="text-2xl font-bold">
            Job<span className="text-primary">Board</span>
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
