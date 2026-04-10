'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X, ChevronDown, MapPin, Tag, Clock, SlidersHorizontal } from "lucide-react";

// ✅ Props
interface FiltersProps {
  locations: string[];
  tags: string[];
}

export default function Filters({ locations, tags }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Current filter values from URL
  const currentLocation = searchParams.get("location") || "all";
  const currentTag = searchParams.get("tag") || "all";
  const currentSort = searchParams.get("sort") || "latest";
  const currentSearch = searchParams.get("search") || "";

  // Check for active filters
  const hasActiveFilters =
    currentLocation !== "all" ||
    currentTag !== "all" ||
    currentSort !== "latest" ||
    currentSearch !== "";

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update URL with new filter value
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to page 1 when filters change
    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    const params = new URLSearchParams();
    // Preserve search if it exists
    if (currentSearch) params.set("search", currentSearch);
    router.push(`/?${params.toString()}`);
  };

  // Active filter pills
  const activeFilters = [
    ...(currentLocation !== "all" ? [{ key: "location", value: currentLocation, label: currentLocation }] : []),
    ...(currentTag !== "all" ? [{ key: "tag", value: currentTag, label: currentTag }] : []),
    ...(currentSort !== "latest" ? [{ key: "sort", value: currentSort, label: `Sort: ${currentSort}` }] : []),
  ];

  return (
    <>
      {/* Desktop Filters - Sticky Sidebar Style */}
      <div className="hidden lg:block">
        <div
          className={`bg-white rounded-xl border border-gray-200 p-5 transition-all duration-300 ${
            isSticky ? "shadow-lg border-blue-100" : ""
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Filters</h2>
              {hasActiveFilters && (
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {activeFilters.length}
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors font-medium"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              Location
            </label>
            <div className="relative">
              <select
                value={currentLocation}
                onChange={(e) => updateFilter("location", e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2.5 pr-8 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Category/Tags Filter */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 text-gray-500" />
              Category
            </label>
            <div className="relative">
              <select
                value={currentTag}
                onChange={(e) => updateFilter("tag", e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2.5 pr-8 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="all">All Categories</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Sort Filter */}
          <div className="mb-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 text-gray-500" />
              Sort By
            </label>
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2.5 pr-8 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters - Modal Style */}
      <div className="lg:hidden">
        {/* Mobile Filter Button */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Active Pills on Mobile */}
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              {activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => updateFilter(filter.key, "all")}
                  className="flex items-center gap-1 bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  {filter.label}
                  <X className="w-3 h-3" />
                </button>
              ))}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 px-2 whitespace-nowrap"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Modal */}
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Modal */}
            <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                  <h2 className="font-semibold text-gray-900">Filters</h2>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Filter Options */}
              <div className="p-4 space-y-6">
                {/* Location */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Location
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilter("location", "all")}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                        currentLocation === "all"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      All Locations
                    </button>
                    {locations.slice(0, 8).map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          updateFilter("location", loc);
                          setIsMobileOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                          currentLocation === loc
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateFilter("tag", "all")}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                        currentTag === "all"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      All
                    </button>
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          updateFilter("tag", tag);
                          setIsMobileOpen(false);
                        }}
                        className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                          currentTag === tag
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    Sort By
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        updateFilter("sort", "latest");
                        setIsMobileOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg border text-sm transition-colors ${
                        currentSort === "latest"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      Latest First
                    </button>
                    <button
                      onClick={() => {
                        updateFilter("sort", "oldest");
                        setIsMobileOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg border text-sm transition-colors ${
                        currentSort === "oldest"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      Oldest First
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Show Results
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Active Filter Pills (Desktop) */}
      {hasActiveFilters && (
        <div className="hidden lg:flex flex-wrap gap-2 mt-4">
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => updateFilter(filter.key, "all")}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              {filter.label}
              <X className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
