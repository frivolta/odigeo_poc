import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomPagination from "./index";
import usePagination from "./hooks/usePagination";
import useIsMobile from "./hooks/useIsMobile";

jest.mock("./hooks/usePagination", () => ({
  __esModule: true,
  default: () => [1, 2, 3, 4, 5],
}));

jest.mock("./hooks/useIsMobile", () => ({
  __esModule: true,
  default: () => false,
}));

describe("CustomPagination component", () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockReset();
  });

  test("renders the CustomPagination with visible page items", () => {
    render(
      <CustomPagination
        currentPage={1}
        totalPages={5}
        maxVisiblePages={5}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("triggers onPageChange when clicking on a pagination item", () => {
    render(
      <CustomPagination
        currentPage={1}
        totalPages={5}
        maxVisiblePages={5}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("triggers onPageChange when clicking on Next and Previous buttons", () => {
    render(
      <CustomPagination
        currentPage={1}
        totalPages={5}
        maxVisiblePages={5}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(
      screen.getByText("Previous", { selector: ".visually-hidden" })
    );
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test("triggers onPageChange when clicking on First and Last buttons", () => {
    render(
      <CustomPagination
        currentPage={3}
        totalPages={5}
        maxVisiblePages={5}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText("First"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Last"));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });
});
