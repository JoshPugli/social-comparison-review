import React, { useState } from "react";
import styles from "./Issue.module.scss"; // Assuming you want to use this, or change to "./Reframe.module.scss" if needed
import { platforms } from "../../assets/variables";


const Issue = ({ selections, setSelections, currentPage, app }) => {
  const [thought, setThought] = useState("");
  let color = platforms.find((platform) => platform.name === app).colorClass;

  const handleThoughtChange = (event) => {
    setThought(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>
        What is a negative thought that you have had as a result of using <span className={styles[color]}>{app}</span>? 
      </h1>
      <div className={styles.subheader}> (This can be a thought that you have had about yourself, others, or the world around you) </div>
      <textarea
        className={styles.thoughtInput}
        value={thought}
        onChange={handleThoughtChange}
        placeholder="Type your thought here..."
        rows="10" // Adjust based on desired size
      ></textarea>
    </div>
  );
};

export default Issue;
