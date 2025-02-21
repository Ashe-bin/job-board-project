"use client";
import { LogoIcon } from "@/components/icons/icons";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { UserSelectionForm } from "./UserSelectionForm";
import { CompanyForm } from "./CompanyForm";
import { JobSeekerForm } from "./JobSeekerForm";

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
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex   justify-center gap-4 mb-10">
        <LogoIcon width={50} height={50} />
        <h1 className="text-4xl font-bold">
          HIRE<span className="text-fuchsia-900">-FOLIO</span>
        </h1>
      </div>
      <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};
