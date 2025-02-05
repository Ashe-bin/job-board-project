import { deleteSavedJobPost, saveJobPost } from "@/app/actions/actions";
import arcjet, { detectBot, fixedWindow } from "@/app/utils/arcjet";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/listofBenefits";
import { SaveJobButton } from "@/components/forms/SubmitButton";
import { JsonToHtml } from "@/components/JsonToHtml";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { request } from "@arcjet/next";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
    })
  )
  .withRule(fixedWindow({ mode: "LIVE", max: 10, window: "60s" }));
async function getJob(id: string, userId?: string) {
  const [jobData, savedJob] = await Promise.all([
    prisma.jobPost.findUnique({
      where: { status: "ACTIVE", id: id },
      select: {
        jobTitle: true,
        jobDescription: true,
        location: true,
        employmentType: true,
        benefit: true,
        createdAt: true,
        listingDuration: true,
        Company: {
          select: { name: true, logo: true, location: true, about: true },
        },
      },
    }),
    userId
      ? prisma.savedJobPost.findUnique({
          where: { userId_jobPostId: { jobPostId: id, userId: userId } },
          select: { id: true },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }
  return { jobData, savedJob };
}
type Params = Promise<{ id: string }>;

const JobListPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const req = await request();

  const decision = await aj.protect(req);

  const session = await auth();

  if (decision.isDenied()) {
    throw new Error("forbidden");
  }

  const { jobData, savedJob } = await getJob(id, session?.user?.id);

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        <div className="space-y-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{jobData.jobTitle}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-medium">{jobData.Company.name}</span>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full" variant={"secondary"}>
                  {jobData.employmentType}
                </Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full">
                  <span>{jobData.Company.location}</span>
                </Badge>
              </div>
            </div>
            {session?.user ? (
              <form
                action={
                  savedJob
                    ? deleteSavedJobPost.bind(null, savedJob.id)
                    : saveJobPost.bind(null, id)
                }
              >
                <SaveJobButton isJobSaved={!!savedJob} />
              </form>
            ) : (
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                <Heart className="size-4" />
                Save jobs
              </Link>
            )}
          </div>
          <section>
            <JsonToHtml json={JSON.parse(jobData.jobDescription)} />
          </section>
          <section>
            <h3 className="font-semibold mb-4">
              Benefits{" "}
              <span className="text-sm text-muted-foreground font-normal">
                (green is offered)
              </span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {benefits.map((benefit) => {
                const isOffered = jobData.benefit.includes(benefit.id);
                return (
                  <Badge
                    key={benefit.id}
                    variant={isOffered ? "default" : "outline"}
                    className=" transition-all hover:scale-105 active:scale-95 text-sm px-3 py-1 rounded-full tracking-wide font-normal border border-primary/30 duration-300"
                  >
                    <span className="flex items-center gap-2">
                      {benefit.icon}
                      {benefit.label}
                    </span>
                  </Badge>
                );
              })}
            </div>
          </section>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3>Apply Know</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Please let {jobData.Company.name} know you found this jobBoard
                </p>
              </div>
              <Button className="w-full">Apply Now</Button>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold">About to job</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Apply before
                </span>
                <span className="text-sm">
                  {new Date(
                    jobData.createdAt.getTime() +
                      jobData.listingDuration * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Posted on</span>
                <span>
                  {jobData.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Employment type
                </span>
                <span>{jobData.employmentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Job location
                </span>
                <span>{jobData.location}</span>
              </div>
            </div>
          </Card>
          <Card className="p-1">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src={jobData.Company.logo}
                  alt="logo"
                  width={48}
                  height={48}
                  className="rounded-full size-12"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold">{jobData.Company.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {jobData.Company.about}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobListPage;
