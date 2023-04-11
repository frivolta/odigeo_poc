import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomSelect, { Option } from "./index";
import "@testing-library/jest-dom";

describe("CustomSelect", () => {
  const options: Option[] = [
    { id: "1", value: "option1", label: "Option 1" },
    { id: "2", value: "option2", label: "Option 2" },
    { id: "3", value: "option3", label: "Option 3" },
  ];

  const defaultProps = {
    controlId: "testSelect",
    label: "Test Label",
    options,
    value: options[0],
    onChange: jest.fn(),
    placeholder: "Select an option",
  };

  test("renders the label and select component", () => {
    render(<CustomSelect {...defaultProps} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  it.todo("'displays the selected value when changed'");
  it.todo("displays the placeholder when no value is selected");
});
