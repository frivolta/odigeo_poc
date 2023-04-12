import { renderHook, act } from "@testing-library/react";
import useSearchForm from "./useSearchForm";
import { Location } from "@/types/models/Location";
describe("useSearchForm", () => {
  const onSubmit = jest.fn();
  const locationA: Location = {
    id: "1",
    value: "New York",
    label: "New York",
  };

  const locationB: Location = {
    id: "2",
    value: "Los Angeles",
    label: "Los Angeles",
  };

  it("should set departure and arrival locations and departure date", () => {
    const { result } = renderHook(() => useSearchForm(onSubmit));

    act(() => {
      result.current.setDepartureLocation(locationA);
      result.current.setArrivalLocation(locationB);
      result.current.setDepartureDate(new Date("2023-04-29T22:00:00.000Z"));
    });

    expect(result.current.departureLocation).toEqual(locationA);
    expect(result.current.arrivalLocation).toEqual(locationB);
    expect(result.current.departureDate).toEqual(
      new Date("2023-04-29T22:00:00.000Z")
    );
  });

  it("should call onSubmit when handleSubmit is called", () => {
    const { result } = renderHook(() => useSearchForm(onSubmit));
    const fakeEvent = { preventDefault: jest.fn() };

    act(() => {
      result.current.setDepartureLocation(locationA);
      result.current.setArrivalLocation(locationB);
      result.current.setDepartureDate(new Date("2023-04-29T22:00:00.000Z"));
    });
    result.current.handleSubmit(fakeEvent as any);

    expect(onSubmit).toHaveBeenCalledWith({
      departureDate: new Date("2023-04-29T22:00:00.000Z"),
      arrivalLocation: locationB.value,
      departureLocation: locationA.value,
    });
    expect(fakeEvent.preventDefault).toHaveBeenCalled();
  });
});
