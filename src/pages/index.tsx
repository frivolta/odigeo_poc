import SearchForm from "@/widgets/SearchForm";
import useLocations from "@/lib/hooks/useLocations/useLocations";
import Layout from "@/components/Layout";
import { Col, Row } from "react-bootstrap";
import Logo from "@/lib/assets/images/logo-std.svg";
import ResultsList from "@/widgets/ResultsList";
import useItineraries from "@/lib/hooks/useItineraries/useItineraries";

export default function Home() {
  const [locations, searchItineraries] = useLocations();
  const [allItineraries] = useItineraries();
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
          {allItineraries ? <ResultsList itineraries={allItineraries} /> : null}
        </Col>
      </Row>
    </Layout>
  );
}
