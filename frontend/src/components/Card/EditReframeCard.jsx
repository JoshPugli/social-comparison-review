import React, { useState } from "react";
import styles from "./EditReframingCard.module.scss";
import { Icon } from "@iconify/react";

const Card = ({ reframe, currReframe, setReframe }) => {
  const [clickedState, setClickedState] = useState([false, false, false]);

  const handleButtonClick = (index) => {
    setClickedState((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  
    setTimeout(() => {
      setClickedState((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }, 1000);
  };

  const handleCopyReframe = () => {
    navigator.clipboard.writeText(reframe);
    handleButtonClick(0);
  };

  const handleAddToReframe = () => {
    setReframe(currReframe + " " + reframe);
    handleButtonClick(1);
  };

  const handleReplaceReframe = () => {
    setReframe(reframe);
    handleButtonClick(2);
  };

  return (
    <div className={styles["distortion-card-container"]}>
      <div className={styles["content-container"]}>
        <div className={styles["distortion-description"]}>
          <p>{reframe}</p>
        </div>
        <div className={styles["bottom-container"]}>
          <div className={styles["bottom-button"]} onClick={handleCopyReframe}>
            {clickedState[0] ? <Icon icon="carbon:checkmark" /> : <Icon icon="ph:copy" />} copy this reframe
          </div>
          <div className={styles["bottom-button"]} onClick={handleAddToReframe}>
          {clickedState[1] ? <Icon icon="carbon:checkmark" /> : <Icon icon="ic:baseline-plus" />} add this to my reframe
          </div>
          <div
            className={styles["bottom-button"]}
            onClick={handleReplaceReframe}
          >
            {clickedState[2] ? <Icon icon="carbon:checkmark" />: <Icon icon="tabler:replace" />} replace my reframe with this one
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
