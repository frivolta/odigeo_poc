import { renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";
import locationReducer from "@/redux/features/locations/locationSlice";
import useLocations from "./useLocations";
import { Location } from "@/types/models/Location";

// Mock the useSelector function
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("useLocations", () => {
  const locations: Location[] = [
    { id: "1", value: "New York", label: "New York" },
    { id: "2", value: "Los Angeles", label: "Los Angeles" },
  ];

  const store = configureStore({
    reducer: {
      locations: locationReducer,
    },
  });

  const wrapper = ({ children }: { children: React.ReactElement }) => (
    <Provider store={store}>{children}</Provider>
  );

  it("should fetch locations and return them", async () => {
    // Mock the Redux useSelector function
    const useSelectorMock = require("react-redux").useSelector;
    useSelectorMock.mockImplementation((callback: any) =>
      callback({ locations: { locations } })
    );

    jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => useLocations(), { wrapper });

    expect(result.current).toEqual([locations]);
    expect(store.dispatch).toHaveBeenCalled();

    useSelectorMock.mockClear();
  });
});
