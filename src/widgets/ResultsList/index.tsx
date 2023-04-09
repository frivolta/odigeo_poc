import { Itinerary } from "@/types/models/Itinerary";
import React, { FC } from "react";
import { Container, Table } from "react-bootstrap";

interface ResultsListProps {
  itineraries: Itinerary[];
}

const ResultsList: FC<ResultsListProps> = ({ itineraries }) => {
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
            <tr key={itinerary.price}>
              <td>{itinerary.price}</td>
              <td>{itinerary.departureLocation}</td>
              <td>{itinerary.arrivalLocation}</td>
              <td>{itinerary.departureDate.toString()}</td>
              <td>{itinerary.arrivalDate.toString()}</td>
              <td>{itinerary.carrier}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ResultsList;
