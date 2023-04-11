import React, { memo } from "react";
import { Pagination } from "react-bootstrap";
import usePagination from "./hooks/usePagination";
import styles from "./index.module.scss";
interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages: number;
  onPageChange: (pageNumber: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = memo(
  ({ currentPage, totalPages, maxVisiblePages, onPageChange }) => {
    const visiblePages = usePagination({
      currentPage,
      totalPages,
      maxVisiblePages,
    });

    return (
      <Pagination size="lg" className={styles.Pagination}>
        <Pagination.First
          className={styles.PageItem}
          onClick={() => onPageChange(1)}
        />
        <Pagination.Prev
          className={styles.PageItem}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        />
        {visiblePages.map((page) => (
          <Pagination.Item
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
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        />
        <Pagination.Last
          className={styles.PageItem}
          onClick={() => onPageChange(totalPages)}
        />
      </Pagination>
    );
  }
);

export default CustomPagination;
