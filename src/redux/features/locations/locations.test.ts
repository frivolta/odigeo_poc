import { configureStore } from "@reduxjs/toolkit";
import LocationSlice, {
  getLocations,
  selectAllLocations,
} from "./locationSlice";
import { RootState } from "@/redux/store";
import { Location } from "@/types/models/Location";

// Mock data
const mockLocations: Location[] = [
  {
    id: "lax",
    value: "lax",
    label: "Lax",
  },
  {
    id: "jfk",
    value: "jfk",
    label: "Jfk",
  },
  {
    id: "ams",
    value: "ams",
    label: "Ams",
  },
  {
    id: "bcn",
    value: "bcn",
    label: "Bcn",
  },
];
const mockedResponse = ["Lax", "Jfk", "Ams", "Bcn"];

// Set up initial fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockedResponse),
  })
) as any;

describe("LocationSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        locations: LocationSlice,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should have initial state", () => {
    const state = store.getState() as RootState;
    expect(selectAllLocations(state)).toEqual([]);
  });

  it("should handle fulfilled state", async () => {
    await store.dispatch(getLocations() as unknown as any);

    const state = store.getState() as RootState;
    expect(selectAllLocations(state)).toEqual(mockLocations);
  });

  it("should handle rejected state", async () => {
    // Update fetch mock to reject
    global.fetch = jest.fn(() => Promise.reject(new Error("Fetch error")));

    await store.dispatch(getLocations() as unknown as any);

    const state = store.getState() as RootState;
    // In the current implementation, there's no error handling in the LocationSlice.
    // You can add error handling similar to the itinerariesSlice example and update this test accordingly.
    expect(selectAllLocations(state)).toEqual([]);
  });
});
