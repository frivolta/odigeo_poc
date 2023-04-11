import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

export interface Option {
  id: string;
  value: string;
  label: string;
}

interface CustomSelectProps {
  controlId: string;
  label: string;
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
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Form.Group>
  );
};

export default CustomSelect;
