import React from "react";
import styles from "./NumberBox.module.scss";

const NumberBox = ({ value, selectedValue, onClick }) => {
  return (
    <div
      className={`${styles.numberBox} ${
        selectedValue === value ? styles.selected : ""
      }`}
      onClick={() => onClick(value)}
    >
      {value}
    </div>
  );
};

export default NumberBox;
