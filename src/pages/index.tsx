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
import { getItineraries } from "@/redux/features/itineraries/itinerariesSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) =>
    selectAllLocations(state)
  );

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
          <Col xs lg="2">
            1 of 3
          </Col>
          <Col md="auto">Variable width content</Col>
          <Col xs lg="2">
            3 of 3
          </Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col md="auto">Variable width content</Col>
          <Col xs lg="2">
            3 of 3
          </Col>
        </Row>
      </Container>
    </>
  );
}
