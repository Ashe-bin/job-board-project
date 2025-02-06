import { checkSessionExits } from "@/app/utils/checkSessionExits";
import { prisma } from "@/app/utils/db";
import { CopyLinkMenu } from "@/components/CopyLinkMenu";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PenBoxIcon, User2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getJobs(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: { Company: { userId: userId } },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      Company: { select: { name: true, logo: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return data;
}
const MyJobListing = async () => {
  const sessions = await checkSessionExits();
  const jobData = await getJobs(sessions.id as string);

  return (
    <>
      {jobData.length === 0 ? (
        <EmptyState
          title="No job posts found"
          description="You don't have any job posts yet."
          buttonText="Create a job post"
          href="/post-job"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>My Jobs</CardTitle>
            <CardDescription>
              Manage your job listings and applications here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobData.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      {listing.Company.logo ? (
                        <Image
                          src={listing.Company.logo}
                          alt="listing company logo"
                          width={40}
                          height={40}
                          className="rounded-md size-10"
                        />
                      ) : (
                        <div className="bg-red-500 size-10 rounded-lg flex items-center justify-center">
                          <User2 className="size-6 text-white" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {listing.Company.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {listing.jobTitle}
                    </TableCell>
                    <TableCell className="font-medium">
                      {listing.status.charAt(0).toUpperCase() +
                        listing.status.slice(1).toLowerCase()}
                    </TableCell>
                    <TableCell className="font-medium">5 </TableCell>
                    <TableCell>
                      {listing.createdAt.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"} size={"icon"}>
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${listing.id}/edit`}>
                              <PenBoxIcon className="size-4" />
                              Edit Job
                            </Link>
                          </DropdownMenuItem>
                          <CopyLinkMenu
                            jobURL={`${process.env.BASE_URL}/job/${listing.id}`}
                          />
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${listing.id}/delete`}>
                              <XCircle className="h-4 w-4" />
                              Delete JOb
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MyJobListing;
