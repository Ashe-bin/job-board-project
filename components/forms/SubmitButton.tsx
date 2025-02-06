"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type PropType = {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  icon: React.ReactNode;
};

export const SubmitButton = ({ text, icon, variant }: PropType) => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" variant={variant} disabled={pending}>
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
export function SaveJobButton({ isJobSaved }: { isJobSaved: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button variant={"outline"} type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {<span>{isJobSaved ? "unSaving..." : "Saving..."}</span>}
        </>
      ) : (
        <>
          <Heart
            className={cn(
              isJobSaved ? "fill-current text-red-500" : "",
              "size-4 transition-colors"
            )}
          />
          {isJobSaved ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
}
