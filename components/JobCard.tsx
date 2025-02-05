import Link from "next/link";
import React from "react";
import { Card, CardHeader } from "./ui/card";
import { MapIcon, MapPin, User2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { formateRelativeTime } from "@/app/utils/formateRelativeTime";

interface JobCardProps {
  id: string;
  location: string;
  createdAt: Date;
  CompanyAbout: string;
  CompanyName: string;
  CompanyLocation: string;
  logo: string;
  jobTitle: string;
  employmentType: string;
  salaryFrom: number;
  salaryTo: number;
}

export const JobCard = ({
  id,
  location,
  createdAt,
  CompanyAbout,
  CompanyName,
  CompanyLocation,
  logo,
  jobTitle,
  employmentType,
  salaryFrom,
  salaryTo,
}: JobCardProps) => {
  return (
    <Link href={`/job/{id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={logo}
              alt={CompanyName}
              width={48}
              height={48}
              className="size-12 rounded-lg"
            />
            <div>
              <h1 className="text-lg md:text-xl font-semibold">{jobTitle}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted-foreground">{CompanyName}</p>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full" variant={"secondary"}>
                  {employmentType}
                </Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full">{CompanyLocation}</Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(salaryFrom)} - {formatCurrency(salaryTo)}
                </p>
              </div>
            </div>
            <div className="md:ml-auto space-y-2 text-right">
              <div className="flex items-center gap-2 justify-end">
                <MapPin className="size-4" />
                <h1>{location}</h1>
              </div>
              <p className="text-sm text-muted-foreground md:text">
                {formateRelativeTime(createdAt)}
              </p>
            </div>
          </div>
          <p className="text-base text-muted-foreground line-clamp-2 !mt-5">
            {CompanyAbout}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
};
