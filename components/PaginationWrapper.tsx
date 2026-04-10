'use client';

import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PaginationWrapper({
  currentPage,
  totalPages,
  searchParams,
}: PaginationWrapperProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();

    // Preserve all existing params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value as string);
      }
    });

    // Set new page
    params.set("page", page.toString());

    router.push(`/?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
