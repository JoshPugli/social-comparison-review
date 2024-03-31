import { React, useState, useEffect } from "react";
import styles from "./Card.module.scss";
import { Icon } from "@iconify/react";

const CustomReframeCard = ({ selected, onClick, isReframe = false, index }) => {
  const [reframe, setReframe] = useState("");

  const handleCardClick = () => {
    onClick(reframe, index); // Pass the description back to the parent component
  };

  useEffect(() => {
    if (selected) {
      onClick(reframe, index);
    }
  }, [selected, reframe]);

  return (
    <div
      className={`${styles["distortion-card-container"]} ${
        selected ? styles.selected : ""
      }`}
      onClick={handleCardClick}
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
            <p>Your own reframe</p>
          </div>
        )}
        <textarea
          className={styles["text-area"]}
          value={reframe}
          onChange={(e) => setReframe(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Type your custom reframe here"
        />
      </div>
    </div>
  );
};

export default CustomReframeCard;
