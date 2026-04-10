'use client';

import { ChevronDown, X } from 'lucide-react';

interface FilterPillProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  isActive?: boolean;
  onClick?: () => void;
  onClear?: () => void;
}

export default function FilterPill({
  label,
  icon,
  value,
  isActive = false,
  onClick,
  onClear,
}: FilterPillProps) {
  const displayValue = value && value !== 'all' ? value : label;
  const isDefault = !value || value === 'all';

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200 ease-out
        border
        ${
          isActive
            ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      <span className="text-gray-500">{icon}</span>
      <span className="truncate max-w-[120px]">
        {isDefault ? label : displayValue}
      </span>
      {isActive ? (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
          className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-3 h-3" />
        </span>
      ) : (
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      )}
    </button>
  );
}
