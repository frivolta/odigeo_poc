import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout, { LayoutProps } from "./index";

// Mock the next/image component
jest.mock("next/image", () => {
  return ({ alt }: { alt: string }) => <img alt={alt} />;
});

const defaultProps: LayoutProps = {
  children: <div>Test content</div>,
  logo: {
    src: "some-logo-source",
    width: 0,
    height: 0,
    blurDataURL: "",
  },
};

describe("Layout component", () => {
  it("renders the Layout component with a custom title", () => {
    render(<Layout {...defaultProps} title="Custom Title" />);

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders the logo in header and footer", () => {
    render(<Layout {...defaultProps} />);

    const images = screen.getAllByAltText("edreams logo");
    expect(images.length).toBe(2);
  });

  it("renders the footer text", () => {
    render(<Layout {...defaultProps} />);

    expect(
      screen.getByText(
        "Front-end Challange, Filippo Rivolta. Not a company website."
      )
    ).toBeInTheDocument();
  });
});
