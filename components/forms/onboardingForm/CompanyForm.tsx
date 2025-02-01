import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/app/utils/zodSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryList } from "@/app/utils/countryList";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/ReExportedUploadthing";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { createCompany } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";

export const CompanyForm = () => {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      about: "",
      logo: "",
      location: "",
      website: "",
      xAccount: "",
    },
  });

  const [isPending, setIsPending] = useState(false);

  async function onSubmit(data: z.infer<typeof companySchema>) {
    try {
      setIsPending(true);
      await createCompany(data);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.error(
          `something went wrong while submitting form ${error.message}`
        );
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>world wide</SelectLabel>
                      <SelectItem value="worldwide">
                        <span>🌎</span>
                        <span> Remote</span>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      {countryList.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.name}
                          data-key={country.name}
                        >
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company website</FormLabel>
                <FormControl>
                  <Input placeholder="http://company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="xAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X/Twitter account</FormLabel>
                <FormControl>
                  <Input placeholder="@Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About your company</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your company.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
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
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      <div
                        className="hover:cursor-pointer hover:bg-red-700 transition absolute -top-2 -right-2 rounded-full bg-red-400 p-1 "
                        onClick={() => field.onChange("")}
                      >
                        <XIcon className=" size-5" />
                      </div>
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
                      className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/50 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary  ut-button:cursor-pointer cursor-pointer"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
};
