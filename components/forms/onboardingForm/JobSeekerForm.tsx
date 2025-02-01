import { createJobSeeker } from "@/app/actions/actions";
import { jobSeekerSchema } from "@/app/utils/zodSchema";
import { UploadDropzone } from "@/components/ReExportedUploadthing";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const JobSeekerForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: { name: "", about: "", resume: "" },
  });

  const onSubmit = async (data: z.infer<typeof jobSeekerSchema>) => {
    try {
      setIsPending(true);
      await createJobSeeker(data);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.error(
          `something went wrong while create a job seeker ${error.message}`
        );
      }
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Your Self</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="tell us about your self, what skill you have, area of expertise"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>Upload Resume ( Pdf )
              <FormControl>
                <div className="flex justify-center">
                  {field.value ? (
                    <div className="relative w-fit ">
                      <Image
                        src="/pdf.png"
                        alt="company logo"
                        width={100}
                        height={100}
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
                      endpoint={"pdfUploader"}
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                      }}
                      onUploadError={(error) =>
                        console.log(`something went wrong ${error}`)
                      }
                      className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/50 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary cursor-pointer"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isPending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
};
