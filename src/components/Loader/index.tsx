import React from "react";
import styles from "./index.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.LoaderContainer} data-testid="loader-container">
      <div className={styles.Spinner} data-testid="spinner"></div>
    </div>
  );
};

export default Loader;
