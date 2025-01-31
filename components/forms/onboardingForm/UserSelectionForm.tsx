import { Button } from "@/components/ui/button";
import { Building2, UserRound } from "lucide-react";
import React from "react";

type UserType = "company" | "jobSeeker";

interface UserSelectionFormProps {
  onSelect: (type: UserType) => void;
}

export const UserSelectionForm = ({ onSelect }: UserSelectionFormProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome! Lets get started</h2>
        <p className="text-muted-foreground">
          Choose how you like to use our platform
        </p>
      </div>
      <div className="grid gap-4">
        <Button
          variant={"outline"}
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
          onClick={() => onSelect("company")}
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Company/Organization</h3>
            <p>post jobs and find great talent</p>
          </div>
        </Button>{" "}
        <Button
          variant={"outline"}
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
          onClick={() => onSelect("jobSeeker")}
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRound className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Job seeker</h3>
            <p>find a great job opportunities</p>
          </div>
        </Button>
      </div>
    </div>
  );
};
