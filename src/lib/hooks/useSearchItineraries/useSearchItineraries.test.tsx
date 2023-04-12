import { renderHook, act } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import useSearchItineraries from "./useSearchItineraries";
import { RootState } from "@/redux/store";
import { CustomError } from "@/types/common/CustomError";
import { Itinerary } from "@/types/models/Itinerary";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
describe("useSearchItineraries", () => {
  it("should return itineraries, loading state, errors, and search function", () => {
    const itineraries: Itinerary[] = [];
    const isLoading = false;
    const errors: CustomError = { hasError: false, messages: [] };

    const state = {
      locations: {
        locations: [],
      },
      itineraries: {
        itineraries: [],
        filteredItineraries: [],
        isFiltered: false,
        loading: isLoading,
        error: errors,
      },
    } as RootState;

    // @ts-ignore
    useSelector.mockImplementation((selector) => selector(state));
    // @ts-ignore
    useDispatch.mockReturnValue(jest.fn());

    const { result } = renderHook(() => useSearchItineraries());

    const [hookItineraries, hookIsLoading, hookErrors] = result.current;

    expect(hookItineraries).toEqual(itineraries);
    expect(hookIsLoading).toEqual(isLoading);
    expect(hookErrors).toEqual(errors);
  });
});
