"use server";

import { z } from "zod";
import { checkSessionExits } from "../utils/checkSessionExits";
import { companySchema, jobSeekerSchema } from "../utils/zodSchema";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await checkSessionExits();
  const validateData = companySchema.parse(data);
  await prisma.user.update({
    where: { id: session.id },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: { create: { ...validateData } },
    },
  });
  return redirect("/");
}
export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const session = await checkSessionExits();
  const validateData = jobSeekerSchema.parse(data);
  await prisma.user.update({
    where: { id: session.id },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: { create: { ...validateData } },
    },
  });
  return redirect("/");
}
