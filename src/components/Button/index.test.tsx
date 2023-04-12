import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./index";

describe("Button component", () => {
  test("renders the Button with children", () => {
    const testText = "Click me";
    render(<Button>{testText}</Button>);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  test("renders the Button with custom size, variant, and color", () => {
    const testText = "Custom Button";
    const { container } = render(
      <Button size="large" variant="outline" color="secondary">
        {testText}
      </Button>
    );

    const buttonElement = container.firstChild;
    expect(buttonElement).toHaveClass("large");
    expect(buttonElement).toHaveClass("outline");
    expect(buttonElement).toHaveClass("secondary");
  });

  test("Button onClick event works", () => {
    const testText = "Click me";
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>{testText}</Button>);

    fireEvent.click(screen.getByText(testText));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Button is disabled when disabled prop is true", () => {
    const testText = "Disabled Button";
    render(<Button disabled>{testText}</Button>);

    const buttonElement = screen.getByText(testText);
    expect(buttonElement).toBeDisabled();
  });

  test("renders the Button with custom type", () => {
    const testText = "Submit Button";
    const { container } = render(<Button type="submit">{testText}</Button>);

    const buttonElement = container.firstChild;
    expect(buttonElement).toHaveAttribute("type", "submit");
  });
});
