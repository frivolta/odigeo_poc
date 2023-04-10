import Select, { GroupBase } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { FC, FormEvent, useState } from "react";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import { Location } from "@/types/models/Location";

interface SearchFormProps {
  locations: Location[];
  onSubmit: (searchCriteria: SearchCriteria) => void;
}

const SearchForm: FC<SearchFormProps> = ({ locations, onSubmit }) => {
  //@ToDo: This should be a custom hook
  const [departureLocation, setDepartureLocation] = useState<Location | null>(
    null
  );
  const [arrivalLocation, setArrivalLocation] = useState<Location | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      departureDate: departureDate?.toString(),
      arrivalLocation: arrivalLocation?.value ?? undefined,
      departureLocation: departureLocation?.value ?? undefined,
    });
  };

  //@ToDo: Refactor to components
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Group controlId="departureLocation">
              <Form.Label>Departure Location</Form.Label>
              <Select
                options={locations}
                value={departureLocation}
                onChange={setDepartureLocation}
                placeholder="Select departure location"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="arrivalLocation">
              <Form.Label>Arrival Location</Form.Label>
              <Select
                options={locations}
                value={arrivalLocation}
                onChange={setArrivalLocation}
                placeholder="Select arrival location"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="departureDate">
              <Form.Label>Departure Date</Form.Label>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
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
