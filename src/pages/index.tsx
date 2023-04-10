import styles from "../styles/Home.module.scss";
import { Inter } from "next/font/google";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocations,
  selectAllLocations,
} from "@/redux/features/locations/locationSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import {
  filterItineraries,
  getItineraries,
  selectAllItineraries,
} from "@/redux/features/itineraries/itinerariesSlice";
import SearchForm from "@/widgets/SearchForm";
import ResultsList from "@/widgets/ResultsList";
import { SearchCriteria } from "@/types/common/SearchCriteria";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) =>
    selectAllLocations(state)
  );
  const itineraries = useSelector((state: RootState) =>
    selectAllItineraries(state)
  );

  //@ToDo: Use callback
  const searchItineraries = (searchCriteria: SearchCriteria) => {
    dispatch(filterItineraries(searchCriteria));
  };
  // @ToDo: https://redux.js.org/tutorials/essentials/part-5-async-logic handle statuses
  useEffect(() => {
    dispatch(getLocations() as unknown as AnyAction);
    dispatch(getItineraries() as unknown as AnyAction);
  }, []);

  console.log("Locations: ", locations);
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          {/*ToDo: Should handle this component with loading or suspence*/}
          {locations ? (
            <SearchForm locations={locations} onSubmit={searchItineraries} />
          ) : null}
          {itineraries ? <ResultsList itineraries={itineraries} /> : null}
        </Row>
      </Container>
    </>
  );
}
