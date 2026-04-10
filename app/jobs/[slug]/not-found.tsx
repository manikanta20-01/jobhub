import Link from "next/link";
import { Briefcase, ArrowLeft } from "lucide-react";

export default function JobNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <Briefcase className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Job Not Found
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The job you&apos;re looking for doesn&apos;t exist or may have been removed.
          Check out our latest opportunities below.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse All Jobs
        </Link>
      </div>
    </div>
  );
}
