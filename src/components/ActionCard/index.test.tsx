import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActionCard from "./index";

describe("ActionCard component", () => {
  test("renders the ActionCard with children", () => {
    const testText = "Test content";
    render(<ActionCard>{testText}</ActionCard>);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  test("renders the ActionCard with custom className", () => {
    const testText = "Test content";
    const customClassName = "custom-class";
    const { container } = render(
      <ActionCard className={customClassName}>{testText}</ActionCard>
    );

    const actionCardElement = container.firstChild;
    expect(actionCardElement).toHaveClass(customClassName);
  });
});
