'use client';

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Job } from "@/lib/markdown";

import JobCard from "@/components/JobCard";
import HorizontalFilters from "@/components/HorizontalFilters";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import { SkeletonCards } from "@/components/SkeletonCard";

// Number of jobs per page
const JOBS_PER_PAGE = 8;

interface JobListWrapperProps {
  allJobs: Job[];
  locations: string[];
  tags: string[];
}

export default function JobListWrapper({
  allJobs,
  locations,
  tags,
}: JobListWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Get filter values from URL
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "all";
  const tag = searchParams.get("tag") || "all";
  const sort = searchParams.get("sort") || "latest";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  // Simulate loading on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort jobs client-side
  const filteredJobs = useMemo(() => {
    let jobs = [...allJobs];

    // Apply search filter
    if (search.trim()) {
      const lowerQuery = search.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowerQuery) ||
          job.company.toLowerCase().includes(lowerQuery) ||
          job.location.toLowerCase().includes(lowerQuery) ||
          job.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
          job.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply location filter
    if (location && location !== "all") {
      jobs = jobs.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Apply tags filter
    if (tag && tag !== "all") {
      jobs = jobs.filter((job) =>
        job.tags.some(
          (t) => t.toLowerCase() === tag.toLowerCase()
        )
      );
    }

    // Apply sorting
    if (sort === "oldest") {
      jobs = [...jobs].reverse();
    }

    return jobs;
  }, [allJobs, search, location, tag, sort]);

  const filteredCount = filteredJobs.length;

  // Calculate pagination
  const totalPages = Math.ceil(filteredCount / JOBS_PER_PAGE);
  const validPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (validPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <>
        {/* Horizontal Filters Skeleton */}
        <div className="mb-6">
          <div className="h-14 bg-gray-100 animate-pulse rounded-xl mb-4" />
        </div>
        <div className="mb-4">
          <p className="text-gray-600">
            Loading <span className="font-semibold">{allJobs.length}</span> jobs...
          </p>
        </div>
        <SkeletonCards count={JOBS_PER_PAGE} />
      </>
    );
  }

  return (
    <>
      {/* Horizontal Filter Bar */}
      <div className="mb-6">
        <HorizontalFilters locations={locations} tags={tags} />
      </div>

      {/* Results Info */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredCount > 0 ? startIndex + 1 : 0}-
            {Math.min(endIndex, filteredCount)}
          </span>{" "}
          of <span className="font-semibold text-gray-900">{filteredCount}</span>{" "}
          jobs
          {search && (
            <span className="text-blue-600">
              {" "}
              for &quot;{search}&quot;
            </span>
          )}
        </p>
        {filteredCount > 0 && totalPages > 1 && (
          <p className="text-sm text-gray-500">
            Page {validPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Job List */}
      {paginatedJobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={validPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <EmptyState search={search} />
      )}
    </>
  );
}
