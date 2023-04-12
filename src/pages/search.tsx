import Layout from "@/components/Layout";
import Logo from "@/lib/assets/images/logo-std.svg";
import { Col, Row } from "react-bootstrap";
import ResultsList from "@/widgets/ResultsList";
import useSearchItineraries from "@/lib/hooks/useSearchItineraries/useSearchItineraries";
import CustomPagination from "@/components/CustomPagination";
import { usePagination } from "@/lib/hooks/usePagination/usePagination";

const ITEMS_PER_PAGE = 10;
const MAX_DESKTOP_PAGES = 3;

const SearchPage = () => {
  const [filteredItineraries, isLoading, errors] = useSearchItineraries();
  const {
    currentPage,
    totalPages,
    currentItems: currentItineraries,
    paginate,
  } = usePagination({
    itemsPerPage: ITEMS_PER_PAGE,
    items: filteredItineraries,
  });

  return (
    <Layout logo={Logo}>
      <Row className="flex-column h-100 g-0">
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
};

export default SearchPage;
