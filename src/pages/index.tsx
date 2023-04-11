import { Inter } from "next/font/google";
import SearchForm from "@/widgets/SearchForm";
import useLocations from "@/lib/hooks/useLocations/useLocations";
import Layout from "@/components/Layout";
import { Col, Row } from "react-bootstrap";
import Logo from "@/lib/assets/images/logo-std.svg";
import { RootState } from "@/redux/store";
import {
  getItineraries,
  selectAllItineraries,
} from "@/redux/features/itineraries/itinerariesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import ResultsList from "@/widgets/ResultsList";

export default function Home() {
  const [locations, searchItineraries] = useLocations();
  const dispatch = useDispatch();
  const itineraries = useSelector((state: RootState) =>
    selectAllItineraries(state)
  );

  useEffect(() => {
    dispatch(getItineraries() as unknown as AnyAction);
  }, [dispatch]);
  return (
    <Layout logo={Logo}>
      <Row className="flex-column h-100 g-0">
        <Col
          xs={12}
          className="h-100 d-flex justify-content-center align-items-center"
        >
          {/*ToDo: Should handle this component with loading or suspence*/}
          {locations ? (
            <SearchForm locations={locations} onSubmit={searchItineraries} />
          ) : null}
        </Col>
        <Col xs={12} className="h-100">
          {itineraries ? <ResultsList itineraries={itineraries} /> : null}
        </Col>
      </Row>
    </Layout>
  );
}
