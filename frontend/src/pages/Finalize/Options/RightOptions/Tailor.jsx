import React, { useState } from "react";
import styles from "./RightOption.module.scss";

const Tailor = ({ getNewReframe }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        placeholder="Tell us more about the situation. What other details are important to consider?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className={styles.textAreaButton}
        onClick={() =>
          getNewReframe(
            `I would like to tailor the reframe to better fit my situation. Here is some other important details about my situation: ${inputValue}`
          )
        }
      >
        Generate an Updated Reframe
      </button>
    </div>
  );
};

export default Tailor;
