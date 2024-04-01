import React, { useState } from "react";
import styles from "./RightOption.module.scss";

const Tailor = () => {
  //   const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        // value={inputValue}
        // onChange={(e) => setInputValue(e.target.value)}
        placeholder="Tell us more about the situation. What other details are important to consider?"
      />
      <button className={styles.textAreaButton}>Generate an Updated Reframe</button>
    </div>
  );
};

export default Tailor;
