import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire-Folio | Find & Post Jobs ",
  description:
    "Discover job opportunities or post job listings with ease. Connect with top talent and employers in your industry.",
  keywords: [
    "jobs",
    "find a job",
    "post a job",
    "hire developers",
    "freelance jobs",
    "remote work",
    "job board",
    "job seekers",
    "hiring platform",
  ],
  authors: [{ name: "Ashenafi Alebachew" }],
  applicationName: "Hire-Folio",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Hire-Folio | Find & Post Jobs",
    description:
      "Hire-Folio connects top talent with the best job opportunities. Job seekers and businesses can easily discover jobs and post job listings.",
    url: "https://hire-folio-iota.vercel.app",
    siteName: "Hire-Folio",
    images: [
      {
        url: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        width: 1200,
        height: 630,
        alt: "Hire-Folio - Find & Post Jobs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find & Post Jobs | Hire-Folio",
    description: "Connect with top companies and job seekers in your industry.",
    images: [
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  alternates: {
    canonical: "https://hire-folio-iota.vercel.app",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
