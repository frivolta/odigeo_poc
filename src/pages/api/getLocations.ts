import type { NextApiRequest, NextApiResponse } from 'next'
import locationsData from './data/locations.json'

type ApiItinerariesResponse = Location[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiItinerariesResponse>
) {
  res.status(200).json(locationsData)
}
