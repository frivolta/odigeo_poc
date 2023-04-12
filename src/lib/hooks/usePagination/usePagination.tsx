import { useMemo, useState } from "react";

interface UsePagination {
  itemsPerPage: number;
  items: any[];
}

interface PaginationResult {
  currentPage: number;
  totalPages: number;
  currentItems: any[];
  paginate: (pageNumber: number) => void;
}

export const usePagination = ({
  itemsPerPage,
  items,
}: UsePagination): PaginationResult => {
  const [currentPage, setCurrentPage] = useState(1);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(
    () => items.slice(indexOfFirstItem, indexOfLastItem),
    [items, currentPage]
  );

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    currentPage,
    totalPages,
    currentItems,
    paginate,
  };
};
