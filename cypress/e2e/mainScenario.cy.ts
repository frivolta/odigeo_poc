// Scenario: User searches for itineraries
//  1.v User should see all the itineraries in the main page sorted by price.
//  2. User should be able to search itineraries using all the fields.
//  3. User should be able to see the results when the user searches.
//  4. User should be able to go back to search page.
//  5.v User should be able to see a loader while fetching.
//  6.v User should be able to see error messages when fetching itineraries fails.
//  7. User should be able to perform a new search after a failed search.
//  8. User should be able to enter an address with search params and get results
//  9. User should be able to enter an address without search params and get results
//  10. User should be able to only enter 1 search param and get results
//  12. User should be able to do all the above in mobile view
// 13.v Every itinerary should include:
//  13.1. Itinerary price
//  13.2. Itinerary departure location
//  13.3. Itinerary arrival location
//  13.4. Itinerary departure date
//  13.5. Itinerary arrival date
//  13.6. Airline carrier

// Only bare minimum tests are written here as most cases are handled by unit tests
const viewports = [
  {
    name: "mobile",
    width: 375,
    height: 667,
  },
  {
    name: "desktop",
    width: 1024,
    height: 768,
  },
];
describe("User enter the website", () => {
  viewports.forEach((viewport) => {
    context(`Running on ${viewport.name}`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);

        cy.visit("/");
      });

      it("should display a search form with no values and search button", () => {
        cy.getByTestId("departure-location")
          .should("be.visible")
          .should("have.value", "");
        cy.getByTestId("arrival-location")
          .should("be.visible")
          .should("have.value", "");
        cy.getByTestId("departure-date")
          .should("be.visible")
          .find("input")
          .should("have.value", "");
        cy.getByTestId("search-button")
          .should("be.visible")
          .should("have.text", "Search");
      });

      it("should display a list of 10 itineraries and two pages", () => {
        cy.intercept("GET", "/api/getItineraries", {
          fixture: "itineraries.json",
        }).as("getItineraries");
        cy.wait("@getItineraries");
        cy.get(".itinerary").should("have.length", 10);
        cy.getByTestId("pagination").should("be.visible");
        if (viewport.name === "desktop") {
          cy.getByTestId("pagination-page-1").should("be.visible");
          cy.getByTestId("pagination-page-2").should("be.visible");
        }
        if (viewport.name === "mobile") {
          cy.getByTestId("pagination-page-next").should("be.visible");
        }
      });

      it("should sort itineraries by price", () => {
        cy.intercept("GET", "/api/getItineraries", {
          fixture: "itineraries.json",
        }).as("getItineraries");
        cy.wait("@getItineraries");
        // Note: This is just for the sake of example, we can make a for loop and check all the itineraries
        cy.get(".itinerary").eq(0).should("contain", "8.11");
        cy.get(".itinerary").eq(9).should("contain", "44.19");
      });

      it("should let the user navigate to the second page", () => {
        cy.intercept("GET", "/api/getItineraries", {
          fixture: "itineraries.json",
        }).as("getItineraries");
        cy.wait("@getItineraries");
        if (viewport.name === "mobile") {
          cy.getByTestId("pagination-page-next").click();
          cy.get(".itinerary").should("have.length", 5);
        } else {
          cy.getByTestId("pagination-page-2").click();
          cy.get(".itinerary").should("have.length", 5);
        }
      });

      it("should show the itinerary with right data(price, departure location, arrival location, departure date, arrival date, airline carrier)", () => {
        cy.intercept("GET", "/api/getItineraries", {
          fixture: "itineraries.json",
        }).as("getItineraries");
        cy.wait("@getItineraries");
        cy.get(".itinerary").eq(0).should("contain", "8.11");
        cy.get(".itinerary").eq(0).should("contain", "Madrid");
        cy.get(".itinerary").eq(0).should("contain", "Roma");
        cy.get(".itinerary")
          .eq(0)
          .should("contain", "2019 January 5, 17:21:40");
        cy.get(".itinerary")
          .eq(0)
          .should("contain", "2019 January 12, 17:21:40");
      });

      it("should show a loader while waiting for results", () => {
        cy.intercept("GET", "/api/getItineraries", {
          fixture: "itineraries.json",
          delayMs: 1000, // Add a 1000ms delay
        }).as("getItineraries");
        cy.getByTestId("loader-container").should("be.visible");
      });

      it("should show an error message when fetching itineraries fails", () => {
        cy.intercept("GET", "/api/getItineraries", {
          statusCode: 400,
          body: {
            message: "Internal server error",
          },
        }).as("getItinerariesError");
        cy.wait("@getItinerariesError");
        cy.getByTestId("errors").should("be.visible");
      });
    });
  });
});
