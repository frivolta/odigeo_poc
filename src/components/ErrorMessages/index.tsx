import React from "react";
import styles from "./index.module.scss";

interface ErrorMessagesProps {
  messages: string[];
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ messages }) => {
  return (
    <div className={styles.ErrorMessages}>
      {messages.map((message, index) => (
        <p key={index} className={styles.ErrorMessage}>
          {message}
        </p>
      ))}
    </div>
  );
};

export default ErrorMessages;
