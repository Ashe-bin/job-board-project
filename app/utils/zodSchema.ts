import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "company name must be at least 2 characters"),
  location: z.string().min(1, "Location must be defined"),
  about: z
    .string()
    .min(10, "please provide enough information about you company"),
  logo: z.string().min(1, "please provide a logo"),
  website: z.string().url("please provide a valid URL"),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least two characters"),
  about: z.string().min(10, "Please provide more information"),
  resume: z.string().min(1, "please upload your resume"),
});

export const jobPostSchema = z.object({
  jobTitle: z.string().min(2, "job title must be at least two characters long"),
  employmentType: z.string().min(1, "please select employment type"),
  location: z.string().min(1, "provide location"),
  salaryFrom: z.number().min(0, "provide salary from"),
  salaryTo: z.number().min(0, "provide salary to"),
  jobDescription: z.string().min(10, "provide more information about the job"),
  listingDuration: z.number().min(1, "provide listing duration"),
  benefit: z.array(z.string()).min(1, "please select at least one benefit"),
  companyName: z.string().min(1, "provide company name"),
  companyLocation: z.string().min(1, "provide company location"),
  companyAbout: z
    .string()
    .min(10, "provide more information about the company"),
  companyLogo: z.string().min(1, "provide company logo"),
  companyWebsite: z.string().min(1, "provide company website URL"),
  companyXAccount: z.string().optional(),
});
