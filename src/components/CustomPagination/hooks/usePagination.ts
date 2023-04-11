import { useMemo } from "react";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages: number;
}

export default function usePagination({
  currentPage,
  totalPages,
  maxVisiblePages,
}: UsePaginationProps) {
  return useMemo(() => {
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      )
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages, maxVisiblePages]);
}
