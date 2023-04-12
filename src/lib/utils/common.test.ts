// src/utils/dateUtils.test.ts
import { convertDateToMilliseconds, convertMillisecondsToDate } from "./common";

describe("Date conversion utilities", () => {
  const testDate = new Date("2023-05-15T10:00:00.000Z");
  const testMilliseconds = testDate.getTime();

  it("should convert a Date object to milliseconds", () => {
    const milliseconds = convertDateToMilliseconds(testDate);
    expect(milliseconds).toEqual(testMilliseconds);
  });

  it("should convert milliseconds to a Date object", () => {
    const date = convertMillisecondsToDate(testMilliseconds.toString());
    expect(date.getTime()).toEqual(testDate.getTime());
  });

  // Edge cases
  it("should handle the minimum possible date (1970-01-01T00:00:00.000Z)", () => {
    const minDate = new Date("1970-01-01T00:00:00.000Z");
    const minMilliseconds = 0;
    expect(convertDateToMilliseconds(minDate)).toEqual(minMilliseconds);
    expect(
      convertMillisecondsToDate(minMilliseconds.toString()).getTime()
    ).toEqual(minDate.getTime());
  });

  it("should handle the maximum possible date (8640000000000000 ms)", () => {
    const maxDate = new Date(8640000000000000);
    const maxMilliseconds = 8640000000000000;
    expect(convertDateToMilliseconds(maxDate)).toEqual(maxMilliseconds);
    expect(
      convertMillisecondsToDate(maxMilliseconds.toString()).getTime()
    ).toEqual(maxDate.getTime());
  });
});
