import React from "react";
import styles from "./DistortionCard.module.scss";
import { Icon } from "@iconify/react";

const DistortionCard = ({
    distortion,
    distortionDescription,
    selected,
    onClick, 
  }) => {
    return (
      <div
        className={`${styles["distortion-card-container"]} ${selected ? styles.selected : ""}`}
        onClick={onClick} 
      >
        <div className={styles["circle-container"]}>
          {selected ? (
            <Icon icon="icon-park-solid:check-one" style={{color: "#1e3765"}}/>
          ) : (
            <Icon icon="material-symbols:circle-outline" style={{color: "lightgray"}}/>
          )}
        </div>
        <div className={styles["content-container"]}>
          <div className={styles["distortion-name"]}>
            <p>{distortion}</p>
          </div>
          <div className={styles["distortion-description"]}>
            <p>{distortionDescription}</p>
          </div>
        </div>
      </div>
    );
  };

export default DistortionCard;
