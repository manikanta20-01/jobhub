import Link from "next/link";
import { getLatestJobs, getAllTags, getAllLocations } from "@/lib/markdown";
import { Building2, Tag, MapPin, MessageCircle, Send } from "lucide-react";

export default function Sidebar() {
  const latestJobs = getLatestJobs(5);
  const tags = getAllTags();
  const locations = getAllLocations();

  return (
    <aside className="space-y-6">
      {/* Follow Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" />
          Follow Us
        </h3>
        <div className="space-y-3">
          <a
            href="https://whatsapp.com/channel/jobshub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">WhatsApp Channel</p>
              <p className="text-xs text-gray-500">Get daily job alerts</p>
            </div>
          </a>

          <a
            href="https://t.me/jobshubchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Telegram Channel</p>
              <p className="text-xs text-gray-500">Join 50K+ members</p>
            </div>
          </a>
        </div>
      </div>

      {/* Latest Jobs */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Latest Jobs
        </h3>
        <ul className="space-y-3">
          {latestJobs.map((job) => (
            <li key={job.id}>
              <Link
                href={`/jobs/${job.slug}`}
                className="block hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors"
              >
                <p className="font-medium text-gray-900 text-sm line-clamp-1">
                  {job.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {job.company} • {job.location.split('/')[0]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-purple-600" />
          Popular Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-600" />
          Popular Locations
        </h3>
        <div className="flex flex-wrap gap-2">
          {locations.slice(0, 8).map((location) => (
            <Link
              key={location}
              href={`/?location=${encodeURIComponent(location)}`}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
            >
              {location}
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Placeholder */}
      <div className="ad-placeholder rounded-xl h-64">
        <span>Advertisement Space</span>
      </div>
    </aside>
  );
}
