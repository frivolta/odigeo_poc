import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { FC } from "react";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import { Location } from "@/types/models/Location";
import CustomSelect from "@/components/CustomSelect";
import useSearchForm from "./hooks/useSearchForm";

interface SearchFormProps {
  locations: Location[];
  onSubmit: (searchCriteria: SearchCriteria) => void;
}

const SearchForm: FC<SearchFormProps> = ({ locations, onSubmit }) => {
  const formState = useSearchForm(onSubmit);

  return (
    <Container>
      <Form onSubmit={formState.handleSubmit}>
        <Row>
          <Col md={3}>
            <CustomSelect
              controlId="departureLocation"
              label="Departure Location"
              options={locations}
              value={formState.departureLocation}
              onChange={formState.setDepartureLocation}
              placeholder="Select departure location"
            />
          </Col>
          <Col md={3}>
            <CustomSelect
              controlId="arrivalLocation"
              label="Arrival Location"
              options={locations}
              value={formState.arrivalLocation}
              onChange={formState.setArrivalLocation}
              placeholder="Select departure location"
            />
          </Col>
          <Col md={3}>
            <Form.Group controlId="departureDate">
              <Form.Label>Departure Date</Form.Label>
              <DatePicker
                selected={formState.departureDate}
                onChange={formState.setDepartureDate}
                dateFormat="yyyy-MM-dd"
                minDate={new Date(2018)}
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button type="submit" variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SearchForm;
