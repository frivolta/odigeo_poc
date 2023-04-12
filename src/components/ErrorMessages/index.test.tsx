import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorMessages from "./index";

describe("ErrorMessages component", () => {
  it("renders error messages correctly", () => {
    const errorMessages = ["Error message 1", "Error message 2"];

    render(<ErrorMessages messages={errorMessages} />);

    errorMessages.forEach((message) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it("renders no error messages when there are none", () => {
    render(<ErrorMessages messages={[]} />);

    expect(screen.queryByText(/Error message/i)).toBeNull();
  });

  it("applies the correct styles to the error messages", () => {
    const errorMessages = ["Error message 1", "Error message 2"];

    render(<ErrorMessages messages={errorMessages} />);

    errorMessages.forEach((message) => {
      const element = screen.getByText(message);
      expect(element).toHaveClass("ErrorMessage");
    });
  });
});
