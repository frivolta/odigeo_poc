import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./index";
import "@testing-library/jest-dom";

describe("Loader component", () => {
  it("renders the Loader component", () => {
    render(<Loader />);

    expect(screen.getByTestId("loader-container")).toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
