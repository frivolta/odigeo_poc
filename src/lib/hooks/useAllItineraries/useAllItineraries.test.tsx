import { renderHook, act } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import useAllItineraries from "./useAllItineraries";
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
describe("useAllItineraries", () => {
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
        loading: false,
        error: { hasError: false, messages: [] },
      },
    } as RootState;

    // @ts-ignore
    useSelector.mockImplementation((selector) => selector(state));
    // @ts-ignore
    useDispatch.mockReturnValue(jest.fn());

    const { result } = renderHook(() => useAllItineraries());

    const [hookItineraries, hookIsLoading, hookErrors, searchItineraries] =
      result.current;

    expect(hookItineraries).toEqual(itineraries);
    expect(hookIsLoading).toEqual(isLoading);
    expect(hookErrors).toEqual(errors);

    act(() => {
      searchItineraries({
        departureLocation: "New York",
        arrivalLocation: "Los Angeles",
        departureDate: new Date("2023-04-12"),
      });
    });
  });
});
