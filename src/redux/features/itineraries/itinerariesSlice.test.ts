import { configureStore } from "@reduxjs/toolkit";
import itinerariesSlice, {
  getItineraries,
  selectAllItineraries,
  selectFilteredItineraries,
  selectIsLoading,
  selectErrors,
} from "./itinerariesSlice";
import { RootState } from "@/redux/store";
import { SearchCriteria } from "@/types/common/SearchCriteria";

// Mock data
const mockItineraries = [
  {
    departureLocation: "AMS",
    arrivalLocation: "BCN",
    departureDate: new Date("2023-05-15T10:00:00.000Z").toISOString(),
  },
  {
    departureLocation: "AMS",
    arrivalLocation: "BCN",
    departureDate: new Date("2023-05-15T12:00:00.000Z").toISOString(),
  },
];

const compareItineraries = (actual: any, expected: any) => {
  expect(actual.length).toEqual(expected.length);
  actual.forEach((itinerary: any, index: any) => {
    expect(itinerary.departureLocation).toEqual(
      expected[index].departureLocation
    );
    expect(itinerary.arrivalLocation).toEqual(expected[index].arrivalLocation);
    expect(itinerary.departureDate).toEqual(expected[index].departureDate);
  });
};

// Set up initial fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockItineraries),
  })
) as any;

describe("itinerariesSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        itineraries: itinerariesSlice,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should have initial state", () => {
    const state = store.getState() as RootState;
    expect(selectAllItineraries(state)).toEqual([]);
    expect(selectFilteredItineraries(state)).toEqual([]);
    expect(selectIsLoading(state)).toBe(false);
    expect(selectErrors(state)).toEqual({ hasError: false, messages: [] });
  });

  it("should handle fulfilled state", async () => {
    const searchCriteria: SearchCriteria = {
      departureLocation: "",
      arrivalLocation: "",
      departureDate: undefined,
    };
    await store.dispatch(getItineraries(searchCriteria) as unknown as any);

    const state = store.getState() as RootState;
    compareItineraries(selectAllItineraries(state), mockItineraries);
    compareItineraries(selectFilteredItineraries(state), mockItineraries);
    expect(selectIsLoading(state)).toBe(false);
    expect(selectErrors(state)).toEqual({ hasError: false, messages: [] });
  });

  it("should handle rejected state", async () => {
    // Update fetch mock to reject
    global.fetch = jest.fn(() => Promise.reject(new Error("Fetch error")));

    const searchCriteria: SearchCriteria = {
      departureLocation: "",
      arrivalLocation: "",
      departureDate: undefined,
    };
    await store.dispatch(getItineraries(searchCriteria) as unknown as any);

    const state = store.getState() as RootState;
    expect(selectAllItineraries(state)).toEqual([]);
    expect(selectFilteredItineraries(state)).toEqual([]);
    expect(selectIsLoading(state)).toBe(false);
    expect(selectErrors(state)).toEqual({
      hasError: true,
      messages: ["Something went wrong"],
    });
  });
});
