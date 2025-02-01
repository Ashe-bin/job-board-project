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
