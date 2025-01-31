"use client";
import { LogoIcon } from "@/components/icons/icons";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { UserSelectionForm } from "./UserSelectionForm";
import { CompanyForm } from "./CompanyForm";

type UserType = "company" | "jobSeeker" | null;

export const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserSelectionForm onSelect={handleUserTypeSelection} />;
      case 2:
        return userType === "company" ? (
          <CompanyForm />
        ) : (
          <p>user is a job seeker</p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex   justify-center gap-4 mb-10">
        <LogoIcon width={50} height={50} />
        <h1 className="text-4xl font-bold">
          Job<span className="text-primary">Marshal</span>
        </h1>
      </div>
      <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};
