import { BanIcon } from "lucide-react";
import React from "react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center rounded-md border border-dashed p-8">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <BanIcon className=" size-10 text-primary  " />
      </div>
      <h2 className="mt-6 text-xl font-semibold">No job post</h2>
      <p className="text-muted-foreground text-center mb-8 mt-2">
        There is no jobs in the database
      </p>
    </div>
  );
};
