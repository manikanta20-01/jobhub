'use client';

import { X } from 'lucide-react';

interface ActiveFilter {
  key: string;
  value: string;
  label: string;
}

interface ActiveFilterChipsProps {
  filters: ActiveFilter[];
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({
  filters,
  onRemoveFilter,
  onClearAll,
}: ActiveFilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 animate-fade-in">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onRemoveFilter(filter.key)}
          className="
            inline-flex items-center gap-1.5
            bg-blue-50 hover:bg-blue-100
            text-blue-700
            text-sm
            px-3 py-1.5
            rounded-full
            transition-colors
            group
          "
        >
          <span className="font-medium">{filter.label}</span>
          <span
            className="
              p-0.5
              rounded-full
              group-hover:bg-blue-200
              transition-colors
            "
          >
            <X className="w-3.5 h-3.5" />
          </span>
        </button>
      ))}

      <button
        onClick={onClearAll}
        className="
          text-sm
          text-red-600 hover:text-red-700
          font-medium
          px-2
          transition-colors
        "
      >
        Clear All
      </button>
    </div>
  );
}
