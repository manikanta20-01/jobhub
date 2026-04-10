import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobsHub - Find Your Dream Job | Latest Job Openings in India",
  description: "Discover the latest job openings across India. Find work from home jobs, freshers jobs, IT jobs, and more. Apply now and start your career journey.",
  keywords: ["jobs", "job portal", "India jobs", "work from home", "freshers jobs", "hiring", "career"],
  openGraph: {
    title: "JobsHub - Find Your Dream Job",
    description: "Discover the latest job openings across India. Find work from home jobs, freshers jobs, IT jobs, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
