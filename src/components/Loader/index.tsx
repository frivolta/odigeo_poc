import React from "react";
import styles from "./index.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.LoaderContainer}>
      <div className={styles.Spinner}></div>
    </div>
  );
};

export default Loader;
