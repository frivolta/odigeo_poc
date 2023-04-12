// src/hooks/usePagination.test.ts
import { renderHook } from "@testing-library/react";
import usePagination from "./usePagination";

describe("usePagination", () => {
  it("should return an array of pages within the specified visible range", () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 5, totalPages: 10, maxVisiblePages: 5 })
    );

    expect(result.current).toEqual([3, 4, 5, 6, 7]);
  });

  it("should adjust the visible range if it goes beyond the total pages", () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 2, totalPages: 6, maxVisiblePages: 5 })
    );

    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });

  it("should not exceed the total pages in the visible range", () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 8, totalPages: 10, maxVisiblePages: 5 })
    );

    expect(result.current).toEqual([6, 7, 8, 9, 10]);
  });

  it("should return an empty array if there are no total pages", () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 1, totalPages: 0, maxVisiblePages: 5 })
    );

    expect(result.current).toEqual([]);
  });

  it("should update the visible range when the current page changes", () => {
    const { result, rerender } = renderHook((props) => usePagination(props), {
      initialProps: { currentPage: 1, totalPages: 10, maxVisiblePages: 5 },
    });

    expect(result.current).toEqual([1, 2, 3, 4, 5]);

    rerender({ currentPage: 6, totalPages: 10, maxVisiblePages: 5 });
    expect(result.current).toEqual([4, 5, 6, 7, 8]);
  });
});
