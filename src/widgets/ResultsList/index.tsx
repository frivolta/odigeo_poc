import ItineraryCard from "@/widgets/ItineraryCard";
import { Itinerary } from "@/types/models/Itinerary";
import React, { FC, memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
      <Row>
        <Col>
          <Container>
            {!isLoading &&
              itineraries.length > 0 &&
              itineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
              ))}
            {isLoading && <Loader />}
            {errors?.hasError && <ErrorMessages messages={errors.messages} />}
          </Container>
        </Col>
      </Row>
    );
  }
);
ResultsList.displayName = "ResultsList";
export default ResultsList;
