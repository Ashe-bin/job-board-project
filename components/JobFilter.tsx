import React from "react";
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

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export const JobFilter = () => {
  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
        <Button variant={"destructive"} size={"sm"} className="h-8">
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
                <Checkbox id={job} />
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
          <Select>
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
