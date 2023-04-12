import { addIdToItineraries, Itinerary, DraftItinerary } from "./Itinerary";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("itineraryFunctions", () => {
  const testDraftItineraries: DraftItinerary[] = [
    {
      arrivalDate: {
        year: 2023,
        month: 4,
        dayOfMonth: 15,
        hourOfDay: 10,
        minute: 0,
        second: 0,
      },
      departureDate: {
        year: 2023,
        month: 4,
        dayOfMonth: 15,
        hourOfDay: 8,
        minute: 0,
        second: 0,
      },
      arrivalLocation: "AMS",
      departureLocation: "BCN",
      carrier: "Carrier A",
      price: 100,
    },
    {
      arrivalDate: {
        year: 2023,
        month: 4,
        dayOfMonth: 16,
        hourOfDay: 10,
        minute: 0,
        second: 0,
      },
      departureDate: {
        year: 2023,
        month: 4,
        dayOfMonth: 16,
        hourOfDay: 8,
        minute: 0,
        second: 0,
      },
      arrivalLocation: "LAX",
      departureLocation: "BCN",
      carrier: "Carrier B",
      price: 200,
    },
  ];

  it("should add unique ids to draft itineraries", () => {
    const mockIds = ["uuid-1", "uuid-2"];
    (uuidv4 as jest.Mock).mockImplementation(() => mockIds.shift());

    const itinerariesWithIds = addIdToItineraries(testDraftItineraries);
    const expectedItineraries: Itinerary[] = [
      { ...testDraftItineraries[0], id: "uuid-1" },
      { ...testDraftItineraries[1], id: "uuid-2" },
    ];

    expect(itinerariesWithIds).toEqual(expectedItineraries);
    expect(uuidv4).toHaveBeenCalledTimes(2);
  });

  // Edge cases
  it("should handle empty arrays", () => {
    const emptyDraftItineraries: DraftItinerary[] = [];

    const itinerariesWithIds = addIdToItineraries(emptyDraftItineraries);
    const expectedItineraries: Itinerary[] = [];

    expect(itinerariesWithIds).toEqual(expectedItineraries);
  });
});
