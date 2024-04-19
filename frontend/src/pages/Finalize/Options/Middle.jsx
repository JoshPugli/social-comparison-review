import { React } from "react";
import styles from "./Options.module.scss";

const Middle = ({
  setScrollValue,
  selections,
  reframe,
  setReframe,
  textAreaValue,
  setTextAreaValue,
  setActiveIndex,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.middleTextLine1}>
        Based on your initial thought,{" "}
        <span style={{ color: "#007FA3" }}>"{selections[1]}"</span>, we've
        reframed it to
        <br />
        <span style={{ color: "#007FA3" }}>"{reframe}"</span>
      </div>
      <div className={styles.middleTextLine2}>
        If you’re happy with this reframe, simply{" "}
        <span style={{ color: "#4892fb" }}>Submit</span> to complete the
        questionnaire. If you want to make adjustments or seek further
        assistance,{" "}
        <span style={{ color: "#36454F" }}>please use the options above</span>
      </div>
    </div>
  );
};

export default Middle;
