'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({ placeholder = "Search jobs, companies, keywords..." }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial search value from URL
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        params.set("search", query.trim());
      } else {
        params.delete("search");
      }

      // Reset to page 1 when searching
      params.delete("page");

      router.push(`/?${params.toString()}`);
      setIsSearching(false);
    },
    [router, searchParams]
  );

  // Set up debounce effect
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  // Handle form submit (for Enter key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedSearch(searchQuery);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 transition-colors ${isSearching ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:border-gray-300"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <div className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-4 w-4 text-gray-400" />
            </div>
          </button>
        )}
      </div>

      {isSearching && searchQuery && (
        <div className="absolute right-4 top-full mt-2 text-xs text-gray-500">
          Searching...
        </div>
      )}
    </form>
  );
}
