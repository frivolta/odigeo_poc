import React from "react";
import { render, screen } from "@testing-library/react";
import Title from "./index";
import "@testing-library/jest-dom";

describe("Title component", () => {
  it("renders the Title component with the correct tag and text", () => {
    render(<Title tag="h1" text="Sample Title" />);

    const title = screen.getByText("Sample Title");
    expect(title.tagName).toBe("H1");
    expect(title).toHaveClass("Title");
  });

  it("renders the Title component with additional className", () => {
    render(<Title tag="h2" text="Sample Title" className="customClass" />);

    const title = screen.getByText("Sample Title");
    expect(title.tagName).toBe("H2");
    expect(title).toHaveClass("Title");
    expect(title).toHaveClass("customClass");
  });
});
