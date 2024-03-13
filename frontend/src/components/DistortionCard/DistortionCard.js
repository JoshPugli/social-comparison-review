import React from "react";
import styles from "./DistortionCard.module.scss";

const DistortionCard = ({ distortion, distortionDescription, selected }) => {
  return (
    <div
      className={`${styles["distortion-card-container"]} ${
        selected ? styles.selected : ""
      }`}
    >
      <div className={styles["distortion-name"]}>
        <h2>{distortion}</h2>
      </div>
      <div className={styles["distortion-description"]}>
        <p>{distortionDescription}</p>
      </div>
    </div>
  );
};

export default DistortionCard;
