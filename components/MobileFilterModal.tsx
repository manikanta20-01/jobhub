'use client';

import { X, MapPin, Tag, Clock, Search, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  locations: string[];
  tags: string[];
  currentLocation: string;
  currentTag: string;
  currentSort: string;
  currentSearch: string;
  onUpdateFilter: (key: string, value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function MobileFilterModal({
  isOpen,
  onClose,
  locations,
  tags,
  currentLocation,
  currentTag,
  currentSort,
  currentSearch,
  onUpdateFilter,
  onClearFilters,
  hasActiveFilters,
}: MobileFilterModalProps) {
  const [localSearch, setLocalSearch] = useState(currentSearch);

  // Update local search when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalSearch(currentSearch);
    }
  }, [isOpen, currentSearch]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSearchSubmit = () => {
    onUpdateFilter('search', localSearch);
  };

  const handleClearAll = () => {
    setLocalSearch('');
    onClearFilters();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl animate-slide-up max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Filters</h2>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium px-2"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              Search
            </h3>
            <div className="relative">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search jobs, companies..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Location Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              Location
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              <button
                onClick={() => onUpdateFilter('location', 'all')}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  currentLocation === 'all'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                All Locations
              </button>
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => onUpdateFilter('location', loc)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    currentLocation === loc
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onUpdateFilter('tag', 'all')}
                className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                  currentTag === 'all'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                All Categories
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onUpdateFilter('tag', tag)}
                  className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                    currentTag === tag
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              Sort By
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onUpdateFilter('sort', 'latest')}
                className={`px-4 py-3 rounded-lg border text-sm transition-colors ${
                  currentSort === 'latest'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                Latest First
              </button>
              <button
                onClick={() => onUpdateFilter('sort', 'oldest')}
                className={`px-4 py-3 rounded-lg border text-sm transition-colors ${
                  currentSort === 'oldest'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-2">
          <button
            onClick={() => {
              handleSearchSubmit();
              onClose();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
