import { formatDateTime } from "@/types/common/DateTime";
import { Itinerary } from "@/types/models/Itinerary";
import React, { FC, memo, useCallback } from "react";
import { Container, Table } from "react-bootstrap";

interface ResultsListProps {
  itineraries: Itinerary[];
}

const ResultsList: FC<ResultsListProps> = memo(({ itineraries }) => {
  return (
    <Container>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Price</th>
            <th>Departure Location</th>
            <th>Arrival Location</th>
            <th>Departure Date</th>
            <th>Arrival Date</th>
            <th>Airline/Carrier</th>
          </tr>
        </thead>
        <tbody>
          {itineraries.map((itinerary) => (
            <tr key={itinerary.id}>
              <td>{itinerary.price}</td>
              <td>{itinerary.departureLocation}</td>
              <td>{itinerary.arrivalLocation}</td>
              <td>{formatDateTime(itinerary.departureDate)}</td>
              <td>{formatDateTime(itinerary.arrivalDate)}</td>
              <td>{itinerary.carrier}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
});

export default ResultsList;
