'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  MapPin,
  Tag,
  Clock,
  Search,
  SlidersHorizontal,
  Filter,
} from 'lucide-react';

import FilterPill from './FilterPill';
import ActiveFilterChips from './ActiveFilterChips';
import MobileFilterModal from './MobileFilterModal';

interface HorizontalFiltersProps {
  locations: string[];
  tags: string[];
}

export default function HorizontalFilters({
  locations,
  tags,
}: HorizontalFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter states from URL
  const currentSearch = searchParams.get('search') || '';
  const currentLocation = searchParams.get('location') || 'all';
  const currentTag = searchParams.get('tag') || 'all';
  const currentSort = searchParams.get('sort') || 'latest';

  // Local states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Track scroll position for sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.filter-dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Sync search input with URL when it changes externally
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  // Update URL with new filter value
  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === 'all' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      // Reset to page 1 when filters change
      params.delete('page');
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    const params = new URLSearchParams();
    router.push(`/?${params.toString()}`);
  }, [router]);

  // Remove single filter
  const removeFilter = useCallback(
    (key: string) => {
      updateFilter(key, 'all');
    },
    [updateFilter]
  );

  // Check if any filters are active
  const hasActiveFilters =
    currentLocation !== 'all' ||
    currentTag !== 'all' ||
    currentSort !== 'latest' ||
    currentSearch !== '';

  // Build active filters list
  const activeFilters = [
    ...(currentLocation !== 'all'
      ? [{ key: 'location', value: currentLocation, label: currentLocation }]
      : []),
    ...(currentTag !== 'all'
      ? [{ key: 'tag', value: currentTag, label: currentTag }]
      : []),
    ...(currentSort !== 'latest'
      ? [{ key: 'sort', value: currentSort, label: `Sort: ${currentSort}` }]
      : []),
    ...(currentSearch
      ? [{ key: 'search', value: currentSearch, label: `"${currentSearch}"` }]
      : []),
  ];

  // Toggle dropdown
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Desktop Horizontal Filter Bar */}
      <div className="hidden lg:block">
        <div
          className={`
            bg-white rounded-xl border border-gray-200 p-4
            transition-all duration-300
            ${isScrolled ? 'shadow-md sticky top-20 z-30' : ''}
          `}
        >
          {/* Filter Bar Row */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input (Minimal) */}
            <div className="relative flex-shrink-0">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateFilter('search', searchInput);
                    }
                  }}
                  className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400 w-32 focus:w-40 transition-all"
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput('')}
                    className="ml-1 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <span className="sr-only">Clear search</span>
                    <svg
                      className="w-3.5 h-3.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                {/* Search Button */}
                <button
                  onClick={() => updateFilter('search', searchInput)}
                  disabled={!searchInput.trim()}
                  className="ml-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200" />

            {/* Location Filter Pill */}
            <div className="relative filter-dropdown-container">
              <FilterPill
                label="Location"
                icon={<MapPin className="w-4 h-4" />}
                value={currentLocation}
                isActive={currentLocation !== 'all'}
                onClick={() => toggleDropdown('location')}
                onClear={() => updateFilter('location', 'all')}
              />

              {/* Location Dropdown */}
              {openDropdown === 'location' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Select Location
                    </span>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <button
                      onClick={() => {
                        updateFilter('location', 'all');
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        currentLocation === 'all'
                          ? 'text-blue-600 font-medium bg-blue-50'
                          : 'text-gray-700'
                      }`}
                    >
                      All Locations
                    </button>
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          updateFilter('location', loc);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                          currentLocation === loc
                            ? 'text-blue-600 font-medium bg-blue-50'
                            : 'text-gray-700'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tags Filter Pill */}
            <div className="relative filter-dropdown-container">
              <FilterPill
                label="Category"
                icon={<Tag className="w-4 h-4" />}
                value={currentTag}
                isActive={currentTag !== 'all'}
                onClick={() => toggleDropdown('tag')}
                onClear={() => updateFilter('tag', 'all')}
              />

              {/* Tags Dropdown */}
              {openDropdown === 'tag' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Select Category
                    </span>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <button
                      onClick={() => {
                        updateFilter('tag', 'all');
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        currentTag === 'all'
                          ? 'text-blue-600 font-medium bg-blue-50'
                          : 'text-gray-700'
                      }`}
                    >
                      All Categories
                    </button>
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          updateFilter('tag', tag);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                          currentTag === tag
                            ? 'text-blue-600 font-medium bg-blue-50'
                            : 'text-gray-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Filter Pill */}
            <div className="relative filter-dropdown-container">
              <FilterPill
                label="Sort"
                icon={<Clock className="w-4 h-4" />}
                value={currentSort === 'latest' ? 'Latest' : 'Oldest'}
                isActive={currentSort !== 'latest'}
                onClick={() => toggleDropdown('sort')}
                onClear={() => updateFilter('sort', 'latest')}
              />

              {/* Sort Dropdown */}
              {openDropdown === 'sort' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Sort By
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      updateFilter('sort', 'latest');
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      currentSort === 'latest'
                        ? 'text-blue-600 font-medium bg-blue-50'
                        : 'text-gray-700'
                    }`}
                  >
                    Latest First
                  </button>
                  <button
                    onClick={() => {
                      updateFilter('sort', 'oldest');
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      currentSort === 'oldest'
                        ? 'text-blue-600 font-medium bg-blue-50'
                        : 'text-gray-700'
                    }`}
                  >
                    Oldest First
                  </button>
                </div>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Results Count */}
            <div className="text-sm text-gray-500">
              {hasActiveFilters && (
                <span className="text-blue-600 font-medium">
                  {activeFilters.length} filter
                  {activeFilters.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <ActiveFilterChips
                filters={activeFilters}
                onRemoveFilter={removeFilter}
                onClearAll={clearFilters}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Bar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-3 mb-4">
          {/* Search Input with Button */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateFilter('search', searchInput);
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {/* Search Button */}
              <button
                onClick={() => updateFilter('search', searchInput)}
                disabled={!searchInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsMobileModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Active Chips on Mobile */}
        {hasActiveFilters && (
          <div className="mb-4">
            <ActiveFilterChips
              filters={activeFilters.filter((f) => f.key !== 'search')}
              onRemoveFilter={removeFilter}
              onClearAll={clearFilters}
            />
          </div>
        )}

        {/* Mobile Filter Modal */}
        <MobileFilterModal
          isOpen={isMobileModalOpen}
          onClose={() => setIsMobileModalOpen(false)}
          locations={locations}
          tags={tags}
          currentLocation={currentLocation}
          currentTag={currentTag}
          currentSort={currentSort}
          currentSearch={currentSearch}
          onUpdateFilter={updateFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
    </>
  );
}
