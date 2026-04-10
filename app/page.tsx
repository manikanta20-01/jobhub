import {
  getAllJobs,
  getAllLocations,
  getAllTags,
} from "@/lib/markdown";

import JobListWrapper from "@/components/JobListWrapper";
import Sidebar from "@/components/Sidebar";
import { Sparkles } from "lucide-react";

// Static export configuration
export const dynamic = "force-static";

export default function HomePage() {
  // Load all data at build time
  const allJobs = getAllJobs();
  const locations = getAllLocations();
  const tags = getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Find your dream job today
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Discover Your Next
          <span className="text-blue-600"> Career Move</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse {allJobs.length}+ job opportunities across India. Find work
          from home, freshers jobs, IT jobs, and more.
        </p>
      </div>

      {/* Top Ad */}
      <div className="ad-placeholder rounded-xl h-24 mb-8">
        <span>Advertisement Space</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT SIDE - Job List */}
        <div className="lg:col-span-3">
          <JobListWrapper
            allJobs={allJobs}
            locations={locations}
            tags={tags}
          />

          {/* Bottom Ad */}
          <div className="ad-placeholder rounded-xl h-24 mt-8">
            <span>Advertisement Space</span>
          </div>
        </div>

        {/* RIGHT SIDE - Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
