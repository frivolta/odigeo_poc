import React from "react";
import styles from "./index.module.scss";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  variant?: "solid" | "outline";
  color?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  testid?: string;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  variant = "solid",
  color = "primary",
  onClick,
  children,
  type = "button",
  disabled = false,
  testid,
}) => {
  const buttonClass = `${styles.Button} ${styles[size]} ${styles[variant]} ${styles[color]}`;
  return (
    <button
      data-testid={testid}
      type={type}
      disabled={disabled}
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
