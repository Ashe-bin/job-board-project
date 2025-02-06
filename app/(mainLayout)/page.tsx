import { JobFilter } from "@/components/JobFilter";
import { JobListing } from "@/components/JobListing";
import JobListingSkeleton from "@/components/JobListingSkeleton";
import { Suspense } from "react";

type SearchParams = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};
export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;
  const jobTypes = params.jobTypes?.split(",") || [];
  const currentPage = Number(params.page) || 1;
  const location = params.location || "";
  const filterKey = `page=${currentPage};types=${jobTypes.join(
    ","
  )};location=${location}`;
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingSkeleton />} key={filterKey}>
          <JobListing
            currentPage={currentPage}
            jobTypes={jobTypes}
            location={location}
          />
        </Suspense>
      </div>
    </div>
  );
}
