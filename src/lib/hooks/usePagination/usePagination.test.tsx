import { renderHook, act } from "@testing-library/react";
import { usePagination } from "./usePagination";

describe("usePagination", () => {
  const items = [
    { id: 1, value: "Item 1" },
    { id: 2, value: "Item 2" },
    { id: 3, value: "Item 3" },
    { id: 4, value: "Item 4" },
  ];

  it("should handle pagination", () => {
    const { result } = renderHook(() =>
      usePagination({ itemsPerPage: 2, items })
    );

    expect(result.current.currentPage).toEqual(1);
    expect(result.current.totalPages).toEqual(2);
    expect(result.current.currentItems).toEqual([
      { id: 1, value: "Item 1" },
      { id: 2, value: "Item 2" },
    ]);

    act(() => {
      result.current.paginate(2);
    });

    expect(result.current.currentPage).toEqual(2);
    expect(result.current.totalPages).toEqual(2);
    expect(result.current.currentItems).toEqual([
      { id: 3, value: "Item 3" },
      { id: 4, value: "Item 4" },
    ]);
  });
});
