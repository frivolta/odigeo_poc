declare namespace Cypress {
  interface Chainable<Subject> {
    getByTestId(value: string): Chainable<JQuery<HTMLElement>>;
  }
}
