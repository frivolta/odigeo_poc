import {
  formatDateTime,
  parseDateTime,
  compareDates,
  DateTime,
} from "./DateTime";

describe("dateTimeFunctions", () => {
  const testDate = new Date("2023-05-15T10:00:00.000Z");
  const testDateTime: DateTime = {
    year: 2023,
    month: 4, // May (0-indexed)
    dayOfMonth: 15,
    hourOfDay: 10,
    minute: 0,
    second: 0,
  };
  const testFormattedDate = "2023 May 15, 10:0:0";

  it("should format DateTime object to string", () => {
    const formattedDate = formatDateTime(testDateTime);
    expect(formattedDate).toEqual(testFormattedDate);
  });

  it("should parse Date object to DateTime object", () => {
    const parsedDateTime = parseDateTime(testDate);
    expect(parsedDateTime).toEqual(testDateTime);
  });

  it("should compare two DateTime objects", () => {
    const testDate2 = new Date("2023-05-16T12:00:00.000Z");
    const testDateTime2: DateTime = {
      year: 2023,
      month: 4, // May (0-indexed)
      dayOfMonth: 16,
      hourOfDay: 12,
      minute: 0,
      second: 0,
    };

    expect(compareDates(testDateTime, testDateTime)).toBe(true);
    expect(compareDates(testDateTime, testDateTime2)).toBe(false);
  });

  // Edge cases
  it("should handle minimum DateTime values", () => {
    const minDate = new Date(-8640000000000000); // Minimum valid Date value
    const minDateTime: DateTime = {
      year: -271821,
      month: 3, // April (0-indexed)
      dayOfMonth: 20,
      hourOfDay: 0,
      minute: 0,
      second: 0,
    };
    expect(parseDateTime(minDate)).toEqual(minDateTime);
    expect(compareDates(minDateTime, minDateTime)).toBe(true);
  });

  it("should handle maximum DateTime values", () => {
    const maxDate = new Date(8640000000000000); // Maximum valid Date value
    const maxDateTime: DateTime = {
      year: 275760,
      month: 8, // September (0-indexed)
      dayOfMonth: 13,
      hourOfDay: 0,
      minute: 0,
      second: 0,
    };
    expect(parseDateTime(maxDate)).toEqual(maxDateTime);
    expect(compareDates(maxDateTime, maxDateTime)).toBe(true);
  });
});
