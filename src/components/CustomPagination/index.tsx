import React, { memo } from "react";
import { Pagination } from "react-bootstrap";
import usePagination from "./hooks/usePagination";
import styles from "./index.module.scss";
import useIsMobile from "./hooks/useIsMobile";
interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages: number;
  onPageChange: (pageNumber: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = memo(
  ({ currentPage, totalPages, maxVisiblePages, onPageChange }) => {
    const isMobile = useIsMobile();
    const visiblePages = usePagination({
      currentPage,
      totalPages,
      maxVisiblePages,
    });

    return (
      <Pagination
        size="lg"
        className={styles.Pagination}
        data-testid="pagination"
      >
        <Pagination.First
          className={styles.PageItem}
          data-testid={`pagination-page-first`}
          onClick={() => onPageChange(1)}
        />
        <Pagination.Prev
          className={styles.PageItem}
          data-testid={`pagination-page-previous`}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        />
        {!isMobile &&
          visiblePages.map((page) => (
            <Pagination.Item
              data-testid={`pagination-page-${page}`}
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
              className={styles.PageItem}
            >
              {page}
            </Pagination.Item>
          ))}
        <Pagination.Next
          className={styles.PageItem}
          data-testid={`pagination-page-next`}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        />
        <Pagination.Last
          data-testid={`pagination-page-last`}
          className={styles.PageItem}
          onClick={() => onPageChange(totalPages)}
        />
      </Pagination>
    );
  }
);

export default CustomPagination;
