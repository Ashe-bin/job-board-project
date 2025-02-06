"use client";
import { jobPostSchema } from "@/app/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/app/utils/countryList";
import { SalaryRangeSelector } from "./SalaryRangeSelector";
import { JobDescriptionEditor } from "../richTextEditor/JobDescriptionEditor";
import BenefitSelector from "../BenefitSelector";
import { Button } from "../ui/button";
import { UploadDropzone } from "../ReExportedUploadthing";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { updateJobPost } from "@/app/actions/actions";

interface EditJobFormProps {
  jobPost: {
    id: string;
    Company: {
      name: string;
      location: string;
      about: string;
      logo: string;
      website: string;
      xAccount: string | null;
    };
    jobTitle: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
    jobDescription: string;
    listingDuration: number;
    benefit: string[];
  };
}

export const EditJobForm = ({ jobPost }: EditJobFormProps) => {
  const form = useForm<z.infer<typeof jobPostSchema>>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      benefit: jobPost.benefit,
      companyAbout: jobPost.Company.about,
      companyLocation: jobPost.Company.location,
      companyName: jobPost.Company.name,
      companyWebsite: jobPost.Company.website,
      companyXAccount: jobPost.Company.xAccount || "",
      employmentType: jobPost.employmentType,
      jobDescription: jobPost.jobDescription,
      jobTitle: jobPost.jobTitle,
      location: jobPost.location,
      salaryFrom: jobPost.salaryFrom,
      salaryTo: jobPost.salaryTo,
      companyLogo: jobPost.Company.logo,
      listingDuration: jobPost.listingDuration,
    },
  });
  const [pending, setPending] = useState(false);

  async function onSubmit(values: z.infer<typeof jobPostSchema>) {
    try {
      setPending(true);
      await updateJobPost(values, jobPost.id);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error("Something went wrong. Please try again!");
      }
    } finally {
      setPending(false);
    }
  }
  return (
    <Form {...form}>
      <form
        className="grid col-span-1 md:col-span-2  gap-y-2 py-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Employment Type</SelectLabel>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Job Location" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <SalaryRangeSelector
                    control={form.control}
                    minSalary={0}
                    maxSalary={500000}
                    currency="USD"
                    step={10}
                  />
                </FormControl>
              </FormItem>
            </div>
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="benefit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <BenefitSelector field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>company Name</FormLabel>
                    <FormControl>
                      <Input value={field.value} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Job Location" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input value={field.value} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyXAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company X (Twitter)</FormLabel>
                    <FormControl>
                      <Input value={field.value} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="companyAbout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About the company</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      value={field.value}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      {field.value ? (
                        <div className="relative w-fit ">
                          <Image
                            src={field.value}
                            alt="company logo"
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint={"imageUploader"}
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                          }}
                          onUploadError={(error) =>
                            console.log(`something went wrong ${error}`)
                          }
                          className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/50 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary  ut-button:cursor-pointer cursor-pointer w-full"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Submitting..." : "Update Job Post"}
        </Button>
      </form>
    </Form>
  );
};
