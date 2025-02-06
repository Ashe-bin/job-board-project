"use client";
import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countryList } from "@/app/utils/countryList";
import { useRouter, useSearchParams } from "next/navigation";

export const JobFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobTypes = ["full-time", "part-time", "contract", "internship"];
  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );
  const handleJobTypeChange = (type: string, checked: boolean) => {
    const current = new Set(currentJobTypes);
    if (checked) {
      current.add(type);
    } else {
      current.delete(type);
    }
    const newValue = Array.from(current).join(",");
    router.push(`?${createQueryString("jobTypes", newValue)}`);
  };

  const clearFilter = () => {
    console.log("clear");
    router.push("/");
  };
  function handleLocationChange(location: string) {
    router.push(`?${createQueryString("location", location)}`);
  }

  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
        <Button
          onClick={clearFilter}
          variant={"destructive"}
          size={"sm"}
          className="h-8"
        >
          <span>Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Job Type</Label>
          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((job, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Checkbox
                  id={job.toLowerCase()}
                  checked={currentJobTypes.includes(job)}
                  onCheckedChange={(checked) =>
                    handleJobTypeChange(job, checked as boolean)
                  }
                />
                <Label htmlFor={job} className="text-md font-medium">
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Location</Label>
          <Select
            onValueChange={(location) => handleLocationChange(location)}
            value={currentLocation}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Location " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>worldwide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌏</span>
                  <span className="pl-2">worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country, idx) => (
                  <SelectItem key={idx} value={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span className="pl-2">{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
