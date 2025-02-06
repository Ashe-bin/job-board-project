import { prisma } from "@/app/utils/db";
import React from "react";
import { EmptyState } from "./EmptyState";
import { JobCard } from "./JobCard";
import { IndexPagination } from "./IndexPagination";
import { JobPostStatus } from "@prisma/client";

async function getData(
  page: number = 1,
  pageSize: number = 10,
  jobTypes: string[] = [],
  location: string = ""
) {
  const skip = (page - 1) * pageSize;

  const where = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && { employmentType: { in: jobTypes } }),
    ...(location && { location: location }),
  };

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        Company: {
          select: { name: true, logo: true, location: true, about: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.jobPost.count({ where: { status: "ACTIVE" } }),
  ]);
  return { data, totalPages: Math.ceil(totalCount / pageSize) };
}

export const JobListing = async ({
  currentPage,
  jobTypes,
  location,
}: {
  currentPage: number;
  jobTypes: string[];
  location: string;
}) => {
  const { data, totalPages } = await getData(
    currentPage,
    7,
    jobTypes,
    location
  );
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((job) => (
            <JobCard
              key={job.id}
              CompanyAbout={job.Company.about}
              CompanyLocation={job.Company.location}
              CompanyName={job.Company.name}
              createdAt={job.createdAt}
              employmentType={job.employmentType}
              id={job.id}
              jobTitle={job.jobTitle}
              location={job.location}
              logo={job.Company.logo}
              salaryFrom={job.salaryFrom}
              salaryTo={job.salaryTo}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          description="Try searching for a different job title or location."
          buttonText="Clear all filters"
          href="/"
        />
      )}
      <div className="flex justify-center mt-6">
        <IndexPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
};
