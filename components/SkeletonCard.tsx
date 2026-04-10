export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Logo Placeholder */}
          <div className="w-14 h-14 bg-gray-200 rounded-xl flex-shrink-0" />

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Title */}
            <div className="h-5 bg-gray-200 rounded w-3/4" />

            {/* Company */}
            <div className="h-4 bg-gray-200 rounded w-1/2" />

            {/* Tags */}
            <div className="flex gap-1.5">
              <div className="h-5 bg-gray-200 rounded-full w-16" />
              <div className="h-5 bg-gray-200 rounded-full w-20" />
            </div>

            {/* Meta */}
            <div className="space-y-2 pt-1">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCards({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
