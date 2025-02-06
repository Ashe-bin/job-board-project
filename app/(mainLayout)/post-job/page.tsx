import { checkSessionExits } from "@/app/utils/checkSessionExits";
import { prisma } from "@/app/utils/db";
import { JobPostForm } from "@/components/forms/jobPostForm/JobPostForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArcjetLogo from "@/public/arcjet.jpg";
import IngestLogo from "@/public/inngest-locale.png";
import Image from "next/image";
import { redirect } from "next/navigation";

const Companies = [
  { id: 0, name: "ArcJet", logo: ArcjetLogo },
  { id: 1, name: "Ingest", logo: IngestLogo },
  { id: 2, name: "ArcJet", logo: ArcjetLogo },
  { id: 3, name: "Ingest", logo: IngestLogo },
  { id: 4, name: "ArcJet", logo: ArcjetLogo },
  { id: 5, name: "Ingest", logo: IngestLogo },
];
const testimonials = [
  {
    quote:
      "This job board helped me find my dream job in just a week! The process was smooth and efficient.",
    name: "Emily Johnson",
    company: "Tech Innovators Inc.",
  },
  {
    quote:
      "We hired our best developers through this platform. The quality of candidates is top-notch!",
    name: "Michael Smith",
    company: "NextGen Solutions",
  },
  {
    quote:
      "A fantastic platform for job seekers! I landed a great role at a company I love.",
    name: "Sophia Lee",
    company: "Creative Minds Co.",
  },
];

const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "50k+", label: "Monthly active job seekers" },
  { value: "100k+", label: "Monthly active job seekers" },
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "60k+", label: "Monthly active job seekers" },
];
console.log(testimonials);

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: { userId: userId },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }
  return data;
}

const PostJobPage = async () => {
  const session = await checkSessionExits();
  const data = await getCompany(session.id as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <JobPostForm
        companyName={data.name}
        companyLocation={data.location}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
        companyAbout={data.about}
        companyLogo={data.logo}
      />
      <div className="col-span-1 text-white">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {Companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-60 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-5">
              {testimonials.map((testimonial, idx) => (
                <blockquote
                  key={idx}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    {testimonial.quote}
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.name}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="rounded-lg bg-muted p-4">
                  <h4 className="text-xl font-bold">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;
