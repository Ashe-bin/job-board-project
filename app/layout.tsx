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
  title: "Find & Post Jobs | Your Job Board",
  description:
    "Discover job opportunities or post job listings with ease. Connect with top talent and employers in your industry.",
  keywords: [
    "jobs",
    "freelance jobs",
    "remote work",
    "job board",
    "find a job",
    "hire developers",
    "freelancers",
  ],
  authors: [{ name: "Ashenafi Alebachew" }],
  applicationName: "Your Job Board",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Find & Post Jobs | Your Job Board",
    description:
      "Find top talent or your next job opportunity. Remote and full-time jobs available!",
    url: "https://job-board-project-iota.vercel.app",
    siteName: "Your Job Board",
    images: [
      {
        url: "https://images.pexels.com/photos/652348/pexels-photo-652348.jpeg?auto=compress&cs=tinysrgb&w=600",
        width: 1200,
        height: 630,
        alt: "Your Job Board - Find & Post Jobs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find & Post Jobs | Your Job Board",
    description: "Connect with top companies and job seekers in your industry.",
    images: [
      "https://images.pexels.com/photos/652348/pexels-photo-652348.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  alternates: {
    canonical: "https://job-board-project-iota.vercel.app",
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
