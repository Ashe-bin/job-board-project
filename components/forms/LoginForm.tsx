import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Github, Google } from "../icons/icons";
import { SubmitButton } from "./SubmitButton";
import { auth, signIn } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export const LoginForm = async () => {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>Login with Google or Github account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/onboarding" });
              }}
            >
              <SubmitButton
                variant="outline"
                text="Login with Github"
                icon={<Github />}
              />
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/onboarding" });
              }}
            >
              <SubmitButton
                variant="outline"
                text="Login with google"
                icon={<Google />}
              />
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground text-balance">
        By Logging in , you agree to our terms and services and privacy policy
      </div>
    </div>
  );
};
