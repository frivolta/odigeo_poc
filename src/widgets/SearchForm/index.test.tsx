import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchForm from "./index";

const mockOnSubmit = jest.fn();
const DOWN_ARROW = { keyCode: 40 };

const mockLocations = [
  {
    id: "location1",
    label: "Location1",
    value: "location1",
  },
  {
    id: "location2",
    label: "Location2",
    value: "location2",
  },
];

// Note: this test cannot use data-testid because the react-select component,
// i usually use data-testid to select the element, but in this case and in the whole project they can be missing for simplicity.
// also some test are missing for the same reason.
describe("SearchForm", () => {
  test("renders the form with the correct inputs", () => {
    render(<SearchForm locations={mockLocations} onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Departure Location")).toBeInTheDocument();
    expect(screen.getByText("Arrival Location")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Departure Date")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("disables the search button when loading is true", () => {
    const { getByText } = render(
      <SearchForm
        locations={mockLocations}
        onSubmit={mockOnSubmit}
        isLoading={true}
      />
    );

    const searchButton = getByText("Loading...");
    expect(searchButton).toBeDisabled();
  });
});
