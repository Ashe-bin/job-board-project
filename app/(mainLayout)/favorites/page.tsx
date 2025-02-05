import { checkSessionExits } from "@/app/utils/checkSessionExits";
import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/EmptyState";
import { JobCard } from "@/components/JobCard";
import React from "react";

async function getFavoriteJob(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: { userId: userId },
    select: {
      JobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          location: true,
          createdAt: true,
          Company: {
            select: { name: true, logo: true, location: true, about: true },
          },
        },
      },
    },
  });
  return data;
}

const FavoriteJobPost = async () => {
  const session = await checkSessionExits();
  const favorites = await getFavoriteJob(session.id as string);

  if (favorites.length == 0) {
    return (
      <EmptyState
        title="No favorites found"
        description="You don't have any favorites yet."
        buttonText="Find a job"
        href="/"
      />
    );
  }
  return (
    <div className="grid grid-cols-1 mt-5 gap-4">
      {favorites.map((favorite) => (
        <JobCard
          key={favorite.JobPost.id}
          CompanyAbout={favorite.JobPost.Company.about}
          CompanyLocation={favorite.JobPost.Company.location}
          CompanyName={favorite.JobPost.Company.name}
          createdAt={favorite.JobPost.createdAt}
          employmentType={favorite.JobPost.employmentType}
          id={favorite.JobPost.id}
          jobTitle={favorite.JobPost.jobTitle}
          location={favorite.JobPost.location}
          logo={favorite.JobPost.Company.logo}
          salaryFrom={favorite.JobPost.salaryFrom}
          salaryTo={favorite.JobPost.salaryTo}
        />
      ))}
    </div>
  );
};

export default FavoriteJobPost;
