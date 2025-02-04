import { JobFilter } from "@/components/JobFilter";
import { JobListing } from "@/components/JobListing";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <JobListing />
      </div>
    </div>
  );
}
