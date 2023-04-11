import SearchForm from "@/widgets/SearchForm";
import useLocations from "@/lib/hooks/useLocations/useLocations";
import Layout from "@/components/Layout";
import { Col, Row } from "react-bootstrap";
import Logo from "@/lib/assets/images/logo-std.svg";
import ResultsList from "@/widgets/ResultsList";
import useItineraries from "@/lib/hooks/useItineraries/useItineraries";
import { useMemo, useState } from "react";
import CustomPagination from "@/components/CustomPagination";

const ITEMS_PER_PAGE = 10;
const MAX_DESKTOP_PAGES = 3;

export default function Home() {
  const [locations, searchItineraries] = useLocations();
  const [allItineraries] = useItineraries();
  const [currentPage, setCurrentPage] = useState(1);
  // Get current itineraries
  const indexOfLastItinerary = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItinerary = indexOfLastItinerary - ITEMS_PER_PAGE;
  const currentItineraries = useMemo(
    () => allItineraries.slice(indexOfFirstItinerary, indexOfLastItinerary),
    [allItineraries, currentPage]
  );

  const totalPages = Math.ceil(allItineraries.length / ITEMS_PER_PAGE);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          {currentItineraries ? (
            <ResultsList itineraries={currentItineraries} />
          ) : null}
        </Col>
      </Row>{" "}
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            maxVisiblePages={MAX_DESKTOP_PAGES}
            onPageChange={paginate}
          />
        </Col>
      </Row>
    </Layout>
  );
}
