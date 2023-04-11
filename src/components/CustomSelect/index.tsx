import React from "react";
import { Form } from "react-bootstrap";
import Select, { StylesConfig } from "react-select";

export interface Option {
  id: string;
  value: string;
  label: string;
}

interface CustomSelectProps {
  controlId: string;
  label?: string;
  options: Option[];
  value: Option | null;
  onChange: (selectedOption: Option | null) => void;
  placeholder: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  controlId,
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  // @Note: unfortunately, react-select doesn't support sass styling, a better approach would be to create it from scratch
  const styles: StylesConfig<Option, false> = {
    option: (provided, state) => ({
      ...provided,
      color: "#4c4c4c",
      fontSize: "18px",
      fontWeight: "500",
    }),
    singleValue: (provided, state) => ({
      ...provided,
    }),
    menu(base, props) {
      return {
        ...base,
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden",
      };
    },
    container: (provided, state) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    menuList: (provided, state) => ({
      ...provided,
      height: "auto",
    }),
  };

  return (
    <Form.Group controlId={controlId}>
      {label && <Form.Label>{label}</Form.Label>}
      <Select
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        options={options}
        styles={styles}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default CustomSelect;
