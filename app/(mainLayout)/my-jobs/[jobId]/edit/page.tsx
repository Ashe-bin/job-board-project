import { checkSessionExits } from "@/app/utils/checkSessionExits";
import { prisma } from "@/app/utils/db";
import { EditJobForm } from "@/components/forms/EditJobForm";
import { notFound } from "next/navigation";
import React from "react";

async function getJobPost({
  jobId,
  userId,
}: {
  jobId: string;
  userId: string;
}) {
  const jobPost = await prisma.jobPost.findUnique({
    where: { id: jobId, Company: { userId: userId } },
    select: {
      benefit: true,
      id: true,
      jobTitle: true,
      jobDescription: true,
      salaryTo: true,
      salaryFrom: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      Company: {
        select: {
          about: true,
          name: true,
          location: true,
          website: true,
          xAccount: true,
          logo: true,
        },
      },
    },
  });

  if (!jobPost) {
    return notFound();
  }
  return jobPost;
}
type Params = Promise<{ jobId: string }>;

const EditJobListingPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  const user = await checkSessionExits();
  const jobPost = await getJobPost({ jobId, userId: user.id as string });

  if (!jobPost) {
    return notFound();
  }

  return (
    <>
      <EditJobForm jobPost={jobPost} />
    </>
  );
};

export default EditJobListingPage;
