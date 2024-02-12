import React, { useState, useRef } from "react";
import styles from "./Usage.module.scss";
import { platforms, usageOptions } from "../../assets/variables";

const Usage = ({ selections, setSelections, currentPage, app }) => {
  const [selectedUsage, setSelectedUsage] = useState(selections[currentPage]);
  let color = platforms.find((platform) => platform.name === app).colorClass;

  const handleSelection = (option) => {
    setSelectedUsage(option); // Update local state
    const updatedSelections = [...selections]; // Copy existing selections
    updatedSelections[currentPage] = option; // Update the current page's selection
    setSelections(updatedSelections); // Update the global selections state
  };

  return (
    <div className={styles.container}>
      <h1>
        How do you primarily use <span className={styles[color]}>{app}</span>?{" "}
      </h1>
      Temporary ugly list of options for example. Need to figure out what to do
      for this.
      <ul className={styles.optionsList}>
        {usageOptions.map((option, index) => (
          <li
            key={index}
            className={
              styles.optionItem +
              (selectedUsage === option ? ` ${styles.selected}` : "")
            }
            onClick={() => handleSelection(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usage;
