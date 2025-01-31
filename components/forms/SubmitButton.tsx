"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type PropType = {
  text: string;
  icon: React.ReactNode;
};

export const SubmitButton = ({ text, icon }: PropType) => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" variant={"outline"} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon} {text}
        </>
      )}
    </Button>
  );
};
