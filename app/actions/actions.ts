"use server";

import { z } from "zod";
import { checkSessionExits } from "../utils/checkSessionExits";
import {
  companySchema,
  jobPostSchema,
  jobSeekerSchema,
} from "../utils/zodSchema";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "../utils/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "../utils/stripe";
import { JobListingDurationPrice } from "../utils/JobListingDurationPrice";

const aj = arcjet
  .withRule(shield({ mode: "LIVE" }))
  .withRule(detectBot({ mode: "LIVE", allow: [] }));

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await checkSessionExits();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }
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

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }
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

export async function createJob(data: z.infer<typeof jobPostSchema>) {
  const user = await checkSessionExits();
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("forbidden");
  }

  const validateData = jobPostSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: { userId: user.id },
    select: { id: true, user: { select: { stripeCustomerId: true } } },
  });

  if (!company?.id) {
    return redirect("/");
  }
  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name || undefined,
    });

    stripeCustomerId = customer.id;

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      jobDescription: validateData.jobDescription,
      jobTitle: validateData.jobTitle,
      employmentType: validateData.employmentType,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      benefit: validateData.benefit,
      listingDuration: validateData.listingDuration,
      companyId: company.id,
    },
    select: { id: true },
  });

  const pricingTier = JobListingDurationPrice.find(
    (tier) => tier.days === validateData.listingDuration
  );

  if (!pricingTier) {
    throw new Error("Invalid listing duration selected");
  }
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job Posting - ${pricingTier.days} Days`,
            description: pricingTier.description,
            images: [
              "https://unsplash.com/photos/shallow-focus-photography-of-red-and-white-for-hire-signage-fY8Jr4iuPQM",
            ],
          },
          currency: "USD",
          unit_amount: pricingTier.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      jobId: jobPost.id,
    },
    mode: "payment",
    success_url: `${process.env.BASE_URL}/payment/success`,
    cancel_url: `${process.env.BASE_URL}/payment/cancel`,
  });
  return redirect(session.url as string);
}
