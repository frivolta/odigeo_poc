import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomSelect, { Option } from "./index";

// Mock the react-select component
jest.mock("react-select", () => (props: any) => {
  const { options, value, onChange, placeholder } = props;
  return (
    <select
      data-testid="mockedSelect"
      value={value?.value}
      onChange={(e) =>
        onChange(options.find((option: any) => option.value === e.target.value))
      }
      placeholder={placeholder}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

const options: Option[] = [
  { id: "1", value: "one", label: "One" },
  { id: "2", value: "two", label: "Two" },
  { id: "3", value: "three", label: "Three" },
];

describe("CustomSelect component", () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockReset();
  });

  test("renders the CustomSelect with provided options", () => {
    render(
      <CustomSelect
        controlId="testSelect"
        label="Test Select"
        options={options}
        value={options[0]}
        onChange={handleChange}
        placeholder="Select an option"
      />
    );

    expect(screen.getByText("Test Select")).toBeInTheDocument();
    expect(screen.getByTestId("mockedSelect")).toBeInTheDocument();
    options.forEach((option) =>
      expect(screen.getByText(option.label)).toBeInTheDocument()
    );
  });

  test("triggers onChange when selecting an option", () => {
    render(
      <CustomSelect
        controlId="testSelect"
        options={options}
        value={options[0]}
        onChange={handleChange}
        placeholder="Select an option"
      />
    );

    fireEvent.change(screen.getByTestId("mockedSelect"), {
      target: { value: options[1].value },
    });

    expect(handleChange).toHaveBeenCalledWith(options[1]);
  });
});
