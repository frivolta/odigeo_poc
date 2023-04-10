import { v4 } from "uuid";

export interface Itinerary {
  id: string;
  arrivalDate: DateTime;
  departureDate: DateTime;
  arrivalLocation: string;
  departureLocation: string;
  carrier: string;
  price: number;
}

export type DraftItinerary = Omit<Itinerary, "id">;

export const addIdToItineraries = (
  draftItinerary: DraftItinerary[]
): Itinerary[] => draftItinerary.map((i) => ({ ...i, id: v4() }));
