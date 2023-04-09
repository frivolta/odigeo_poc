import type { NextApiRequest, NextApiResponse } from "next";
import { Itinerary } from "../../types/models/Itinerary";
import itinerariesData from "./data/itineraries.json";

type ApiItinerariesResponse = Itinerary[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiItinerariesResponse>
) {
  // @Fr: Simulating api loading
  setTimeout(() => {
    res.status(200).json(itinerariesData);
  }, 1000);
}
