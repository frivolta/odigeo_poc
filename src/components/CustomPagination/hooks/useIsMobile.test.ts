import { renderHook } from "@testing-library/react";
import useIsMobile, { MOBILE_WIDTH_THRESHOLD } from "./useIsMobile";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

describe("useIsMobile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return true if the window width is less than or equal to the mobile width threshold", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: MOBILE_WIDTH_THRESHOLD,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should return false if the window width is greater than the mobile width threshold", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: MOBILE_WIDTH_THRESHOLD + 1,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should update isMobile value when window resizes", () => {
    const initialWidth = MOBILE_WIDTH_THRESHOLD - 1;
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: initialWidth,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
    act(() => {
      // Change the window width to simulate resize
      window.innerWidth = MOBILE_WIDTH_THRESHOLD + 1;
      window.dispatchEvent(new Event("resize"));
    });

    // Verify that the isMobile value updated
    expect(result.current).toBe(false);
  });
});
