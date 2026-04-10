import Link from "next/link";
import { Briefcase, TrendingUp } from "lucide-react";

interface EmptyStateProps {
  search: string;
}

export default function EmptyState({ search }: EmptyStateProps) {
  return (
    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
      <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No jobs found
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {search
          ? `We couldn't find any jobs matching "${search}". Try different keywords or filters.`
          : "No jobs match your current filters. Try adjusting your search criteria."}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        <TrendingUp className="w-4 h-4" />
        View All Jobs
      </Link>
    </div>
  );
}
