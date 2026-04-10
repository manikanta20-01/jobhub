import { MetadataRoute } from "next";
import { getAllJobs, getAllPageSlugs } from "@/lib/markdown";

// Static export configuration
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jobshub.in";

  // Static pages
  const staticPages = [
    "",
    "about",
    "contact",
    "privacy-policy",
    "terms-and-conditions",
    "disclaimer",
  ];

  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page ? `/${page}` : ""}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: page === "" ? 1 : 0.8,
  }));

  // Job pages
  const jobs = getAllJobs();
  const jobEntries = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}/`,
    lastModified: new Date(job.date),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...jobEntries];
}
