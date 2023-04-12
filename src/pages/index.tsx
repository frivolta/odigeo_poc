import SearchForm from "@/widgets/SearchForm";
import useLocations from "@/lib/hooks/useLocations/useLocations";
import Layout from "@/components/Layout";
import { Col, Row } from "react-bootstrap";
import Logo from "@/lib/assets/images/logo-std.svg";
import ResultsList from "@/widgets/ResultsList";
import useItineraries from "@/lib/hooks/useAllItineraries/useAllItineraries";
import CustomPagination from "@/components/CustomPagination";
import { usePagination } from "@/lib/hooks/usePagination/usePagination";

const ITEMS_PER_PAGE = 10;
const MAX_DESKTOP_PAGES = 3;

export default function Home() {
  const [locations] = useLocations();
  const [allItineraries, isLoading, errors, searchItineraries] =
    useItineraries();
  const {
    currentPage,
    totalPages,
    currentItems: currentItineraries,
    paginate,
  } = usePagination({
    itemsPerPage: ITEMS_PER_PAGE,
    items: allItineraries,
  });

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
            <ResultsList
              itineraries={currentItineraries}
              isLoading={isLoading}
            />
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          {!isLoading && !errors.hasError && currentItineraries && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              maxVisiblePages={MAX_DESKTOP_PAGES}
              onPageChange={paginate}
            />
          )}
        </Col>
      </Row>
    </Layout>
  );
}
