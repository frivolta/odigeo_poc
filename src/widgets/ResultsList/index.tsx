import ItineraryCard from "@/widgets/ItineraryCard";
import { formatDateTime } from "@/types/common/DateTime";
import { Itinerary } from "@/types/models/Itinerary";
import React, { FC, memo, useCallback } from "react";
import { Container, Table } from "react-bootstrap";
import Loader from "@/components/Loader";
import { CustomError } from "@/types/common/CustomError";
import ErrorMessages from "@/components/ErrorMessages";

interface ResultsListProps {
  itineraries: Itinerary[];
  isLoading?: boolean;
  errors?: CustomError;
}

const ResultsList: FC<ResultsListProps> = memo(
  ({ itineraries, isLoading, errors }) => {
    return (
      <Container>
        {!isLoading &&
          itineraries.length > 0 &&
          itineraries.map((itinerary) => (
            <ItineraryCard itinerary={itinerary} />
          ))}
        {isLoading && <Loader />}
        {errors?.hasError && <ErrorMessages messages={errors.messages} />}
      </Container>
    );
  }
);

export default ResultsList;
