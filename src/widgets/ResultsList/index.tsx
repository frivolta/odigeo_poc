import ItineraryCard from "@/widgets/ItineraryCard";
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
      {itineraries.length > 0 ? (
        itineraries.map((itinerary) => <ItineraryCard itinerary={itinerary} />)
      ) : (
        <>No Results found</>
      )}
    </Container>
  );
});

export default ResultsList;
