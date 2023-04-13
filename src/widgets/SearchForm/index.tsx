import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Container } from "react-bootstrap";
import { FC } from "react";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import { Location } from "@/types/models/Location";
import CustomSelect from "@/components/CustomSelect";
import useSearchForm from "./hooks/useSearchForm";
import styles from "./index.module.scss";
import ActionCard from "@/components/ActionCard";
import Button from "@/components/Button";

interface SearchFormProps {
  locations: Location[];
  onSubmit: (searchCriteria: SearchCriteria) => void;
  isLoading?: boolean;
}

const SearchForm: FC<SearchFormProps> = ({
  locations,
  onSubmit,
  isLoading,
}) => {
  const formState = useSearchForm(onSubmit);

  return (
    <ActionCard>
      <Container className={styles.SearchFormContainer}>
        <Form
          onSubmit={formState.handleSubmit}
          className={styles.SearchFormInputs}
        >
          <CustomSelect
            testid="departure-location"
            controlId="departureLocation"
            options={locations}
            value={formState.departureLocation}
            onChange={formState.setDepartureLocation}
            placeholder="Departure Location"
          />
          <CustomSelect
            testid="arrival-location"
            controlId="arrivalLocation"
            options={locations}
            value={formState.arrivalLocation}
            onChange={formState.setArrivalLocation}
            placeholder="Arrival Location"
          />
          <Form.Group controlId="departureDate" data-testid="departure-date">
            <DatePicker
              data-testid="departure-date"
              selected={formState.departureDate}
              onChange={formState.setDepartureDate}
              dateFormat="yyyy-MM-dd"
              minDate={new Date(2018)}
              className="form-control"
              placeholderText="Departure Date"
            />
          </Form.Group>
          <Button
            size="large"
            color="secondary"
            type="submit"
            testid="search-button"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </Form>
      </Container>
    </ActionCard>
  );
};

export default SearchForm;
