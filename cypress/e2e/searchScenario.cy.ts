// Scenario: User searches for itineraries
//  1.v User should be able to search itineraries using all the fields.
//  2.v User should be able to see the results when the user searches.
//  3.v User should be able to go back to search page.
//  5.v User should be able to enter an address with search params and get results
//  6.v User should be able to enter an address without search params and get results
//  7.v User should be able to only enter 1 search param and get results
//  8.v User should be able to do all the above in mobile view
// Only bare minimum tests are written here as most cases are handled by unit tests
const searchViewports = [
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
describe("User searches for itineraries", () => {
  searchViewports.forEach((viewport) => {
    context(`Running on ${viewport.name}`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit("/");
        cy.intercept("GET", "/api/getItineraries", {
          fixture: "itineraries.json",
        }).as("getItineraries");
      });

      it("should display let user insert data to search for an itinerary", () => {
        cy.getByTestId("departure-location").click().type("{downarrow}{enter}");
        cy.getByTestId("arrival-location")
          .click()
          .type("{downarrow}{downarrow}{enter}");
        cy.getByTestId("departure-date").click().type("2023-04-05{enter}");
        cy.getByTestId("search-button").click();
        cy.location("pathname").should("eq", "/search");
        cy.location("search").should(
          "eq",
          "?departureLocation=madrid&arrivalLocation=barcelona&departureDate=1680645600000"
        );
      });

      it("should show a list of itineraries when user searches sorted by price", () => {
        cy.wait("@getItineraries");
        cy.getByTestId("departure-location").click().type("{downarrow}{enter}");
        cy.getByTestId("arrival-location")
          .click()
          .type("{downarrow}{downarrow}{enter}");
        cy.getByTestId("departure-date").click().type("2023-01-06{enter}");
        cy.getByTestId("search-button").click();
        cy.location("pathname").should("eq", "/search");
        cy.wait("@getItineraries");
        cy.get(".itinerary").should("have.length", 2);
        cy.getByTestId("pagination").should("be.visible");
        cy.get(".itinerary").eq(0).should("contain", "0.1");
        cy.get(".itinerary").eq(0).should("contain", "Madrid");
        cy.get(".itinerary").eq(0).should("contain", "Barcelona");
        cy.get(".itinerary").eq(1).should("contain", "1000");
        cy.get(".itinerary").eq(1).should("contain", "Madrid");
        cy.get(".itinerary").eq(1).should("contain", "Barcelona");
        if (viewport.name === "desktop") {
          cy.getByTestId("pagination-page-1").should("be.visible");
        }
      });
      it("should show let the user go back to main page", () => {
        cy.wait("@getItineraries");
        cy.getByTestId("departure-location").click().type("{downarrow}{enter}");
        cy.getByTestId("arrival-location")
          .click()
          .type("{downarrow}{downarrow}{enter}");
        cy.getByTestId("departure-date").click().type("2023-01-06{enter}");
        cy.getByTestId("search-button").click();
        cy.location("pathname").should("eq", "/search");
        cy.getByTestId("go-back-to-search").click();
        cy.location("pathname").should("eq", "/");
      });
      it("should let user insert an address and get results", () => {
        cy.wait("@getItineraries");
        cy.visit(
          "/search?departureLocation=madrid&arrivalLocation=barcelona&departureDate=1672959600000"
        );

        cy.get(".itinerary").should("have.length", 2);
        cy.getByTestId("pagination").should("be.visible");
        cy.get(".itinerary").eq(0).should("contain", "0.1");
        cy.get(".itinerary").eq(0).should("contain", "Madrid");
        cy.get(".itinerary").eq(0).should("contain", "Barcelona");
        cy.get(".itinerary").eq(1).should("contain", "1000");
        cy.get(".itinerary").eq(1).should("contain", "Madrid");
        cy.get(".itinerary").eq(1).should("contain", "Barcelona");
      });
      it("should search by date only", () => {
        cy.wait("@getItineraries");
        cy.getByTestId("departure-date").click().type("2023-01-06{enter}");
        cy.getByTestId("search-button").click();
        cy.get(".itinerary").should("have.length", 2);
        cy.get(".itinerary").eq(0).should("contain", "0.1");
        cy.get(".itinerary").eq(0).should("contain", "Madrid");
        cy.get(".itinerary").eq(0).should("contain", "Barcelona");
        cy.get(".itinerary").eq(1).should("contain", "1000");
        cy.get(".itinerary").eq(1).should("contain", "Madrid");
        cy.get(".itinerary").eq(1).should("contain", "Barcelona");
      });
      it("should search by departure location only", () => {
        cy.wait("@getItineraries");
        cy.getByTestId("departure-location").click().type("{downarrow}{enter}");
        cy.getByTestId("search-button").click();
        cy.get(".itinerary").should("have.length", 3);
        cy.get(".itinerary").eq(0).should("contain", "Madrid");
        cy.get(".itinerary").eq(1).should("contain", "Madrid");
        cy.get(".itinerary").eq(2).should("contain", "Madrid");
      });
      it("should search by departure location only", () => {
        cy.wait("@getItineraries");
        cy.getByTestId("arrival-location")
          .click()
          .type("{downarrow}{downarrow}{enter}");
        cy.getByTestId("search-button").click();
        cy.get(".itinerary").should("have.length", 4);
        cy.get(".itinerary").eq(0).should("contain", "Barcelona");
        cy.get(".itinerary").eq(1).should("contain", "Barcelona");
        cy.get(".itinerary").eq(2).should("contain", "Barcelona");
        cy.get(".itinerary").eq(3).should("contain", "Barcelona");
      });
    });
  });
});
