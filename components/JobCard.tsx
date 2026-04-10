import Link from "next/link";
import { MapPin, Building2, Calendar, IndianRupee } from "lucide-react";
import type { Job } from "@/lib/markdown";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Today";
    if (diffDays <= 2) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const getTagClass = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag === "wfh" || lowerTag === "remote") return "tag-wfh";
    if (lowerTag === "fresher" || lowerTag === "entry-level") return "tag-fresher";
    if (lowerTag === "experienced" || lowerTag === "senior") return "tag-experienced";
    return "";
  };

  return (
    <Link href={`/jobs/${job.slug}`}>
      <article className="job-card bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300">
        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Logo Placeholder */}
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-xl">
                {job.company.charAt(0)}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 truncate">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span className="truncate">{job.company}</span>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {job.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={`tag ${getTagClass(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-green-700 font-medium">
                  <IndianRupee className="w-4 h-4 flex-shrink-0" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{formatDate(job.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
