import { stringToLocation, locationsToString, Location } from "./Location";

describe("locationFunctions", () => {
  const testLocations: string[] = ["AMS", "BCN", "LAX"];
  const testLocationObjects: Location[] = [
    { id: "ams", value: "ams", label: "AMS" },
    { id: "bcn", value: "bcn", label: "BCN" },
    { id: "lax", value: "lax", label: "LAX" },
  ];

  it("should convert string array to Location array", () => {
    const convertedLocations = stringToLocation(testLocations);
    expect(convertedLocations).toEqual(testLocationObjects);
  });

  it("should convert Location array to string array", () => {
    const convertedStrings = locationsToString(testLocationObjects);
    expect(convertedStrings).toEqual(testLocations);
  });

  // Edge cases
  it("should handle empty arrays", () => {
    const emptyLocations: string[] = [];
    const emptyLocationObjects: Location[] = [];

    expect(stringToLocation(emptyLocations)).toEqual(emptyLocationObjects);
    expect(locationsToString(emptyLocationObjects)).toEqual(emptyLocations);
  });

  it("should handle one-letter location codes", () => {
    const oneLetterLocations: string[] = ["A", "B", "C"];
    const oneLetterLocationObjects: Location[] = [
      { id: "a", value: "a", label: "A" },
      { id: "b", value: "b", label: "B" },
      { id: "c", value: "c", label: "C" },
    ];

    expect(stringToLocation(oneLetterLocations)).toEqual(
      oneLetterLocationObjects
    );
    expect(locationsToString(oneLetterLocationObjects)).toEqual(
      oneLetterLocations
    );
  });
});
