import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import useSearchCriteria from "./useSearchCriteria";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
describe("useSearchCriteria", () => {
  const mockedUseRouter = useRouter as jest.Mock;

  afterEach(() => {
    mockedUseRouter.mockReset();
  });

  it("should return search criteria based on router query", () => {
    mockedUseRouter.mockReturnValue({
      isReady: true,
      query: {
        departureLocation: "New York",
        arrivalLocation: "Los Angeles",
        departureDate: "1682805600000",
      },
    });

    const { result } = renderHook(() => useSearchCriteria());
    expect(result.current.departureLocation).toEqual("New York");
    expect(result.current.arrivalLocation).toEqual("Los Angeles");
    expect(result.current.departureDate).toEqual(
      new Date("2023-04-29T22:00:00.000Z")
    );
  });

  it("should return empty search criteria when router is not ready", () => {
    mockedUseRouter.mockReturnValue({
      isReady: false,
      query: {},
    });

    const { result } = renderHook(() => useSearchCriteria());
    expect(result.current.departureLocation).toBeUndefined();
    expect(result.current.arrivalLocation).toBeUndefined();
    expect(result.current.departureDate).toBeUndefined();
  });
  it("should return search criteria with missing or undefined fields", () => {
    mockedUseRouter.mockReturnValue({
      isReady: true,
      query: {
        departureLocation: undefined,
        arrivalLocation: "Los Angeles",
        departureDate: "1682805600000",
      },
    });

    const { result } = renderHook(() => useSearchCriteria());
    expect(result.current.departureLocation).toBeUndefined();
    expect(result.current.arrivalLocation).toEqual("Los Angeles");
    expect(result.current.departureDate).toEqual(
      new Date("2023-04-29T22:00:00.000Z")
    );
  });
});
