import React from "react";
import styles from "./DistortionCard.module.scss";
import { Icon } from "@iconify/react";

const DistortionLoadingCard = ({}) => {
  return (
    <div className={`${styles["distortion-card-container"]} ${styles["loading-background"]}`}>
        <div className={styles["circle-container"]}>
      <Icon
        icon="material-symbols:circle-outline"
        style={{ color: "lightgray" }}
      />
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["distortion-name"]}>
          <p style={{ opacity: 0 }}>filler</p>
        </div>
        <div className={styles["distortion-description"]}>
          <p style={{ opacity: 0 }}>filler</p>
        </div>
      </div>
    </div>
  );
};

export default DistortionLoadingCard;
