import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs, getJobBySlug } from "@/lib/markdown";
import Sidebar from "@/components/Sidebar";
import { MapPin, Building2, Calendar, IndianRupee, ArrowLeft, Share2, Bookmark, ExternalLink } from "lucide-react";

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all jobs
export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

// Generate metadata for each job page
export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found | JobsHub",
    };
  }

  return {
    title: `${job.title} at ${job.company} | JobsHub`,
    description: job.description,
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.description,
      type: "article",
    },
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.date,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location?.split("/")[0]?.trim() || "India",
        addressCountry: "IN",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        text: job.salary,
      },
    },
  };

  const getTagClass = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag === "wfh" || lowerTag === "remote") return "tag-wfh";
    if (lowerTag === "fresher" || lowerTag === "entry-level") return "tag-fresher";
    if (lowerTag === "experienced" || lowerTag === "senior") return "tag-experienced";
    return "";
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Banner */}
              <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">
                      {job.company?.charAt(0) || "J"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="pt-14 px-6 pb-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" title="Share">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" title="Save">
                      <Bookmark className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags?.map((tag) => (
                    <span key={tag} className={`tag ${getTagClass(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-green-700 font-medium">
                    <IndianRupee className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {job.date}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Ad Placeholder */}
                <div className="ad-placeholder rounded-xl h-32 mb-6">
                  <span>Advertisement</span>
                </div>

                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: job.htmlContent }}
                />

                {/* Apply Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  {job.applyLink ? (
                    <>
                      <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors gap-2"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <p className="text-sm text-gray-500 mt-3">
                        Clicking apply will redirect you to the company&apos;s application page
                      </p>
                    </>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-amber-800 text-sm">
                        No direct application link available. Please check the &quot;How to Apply&quot; section below for application instructions.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
