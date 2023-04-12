import React, { FC } from "react";
import styles from "./index.module.scss";

interface TitleProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ tag, text, className }) => {
  const CustomTag = tag as keyof JSX.IntrinsicElements;

  return (
    <CustomTag className={`${styles.Title} ${className ? className : ""}`}>
      {text}
    </CustomTag>
  );
};

export default Title;
