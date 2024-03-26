import React from "react";
import styles from "./Card.module.scss";
import { Icon } from "@iconify/react";

const Card = ({ title, description, selected, onClick, isReframe = false }) => {
  return (
    <div
      className={`${styles["distortion-card-container"]} ${
        selected ? styles.selected : ""
      }`}
      onClick={onClick}
    >
      <div className={styles["circle-container"]}>
        {selected ? (
          <Icon icon="icon-park-solid:check-one" style={{ color: "#1e3765" }} />
        ) : (
          <Icon
            icon="material-symbols:circle-outline"
            style={{ color: "lightgray" }}
          />
        )}
      </div>
      <div className={styles["content-container"]}>
        {!isReframe && (
          <div className={styles["distortion-name"]}>
            <p>{title}</p>
          </div>
        )}
        <div className={styles["distortion-description"]}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
