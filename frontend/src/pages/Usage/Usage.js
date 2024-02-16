import React, { useState } from "react";
import styles from "./Usage.module.scss";
import { platforms, usageOptions, useStyles } from "../../assets/variables"; // Assuming useStyles is not needed here
import TextBox from "../../components/TextBox/TextBox";
import TextField from "@material-ui/core/TextField";

const Usage = ({ selections, setSelections, currentPage, app }) => {
  // Combining both states into a single state to maintain the selected or typed value
  const [usageValue, setUsageValue] = useState(selections[currentPage] || "");
  let color = platforms.find((platform) => platform.name === app).colorClass;

  const handleSelection = (option) => {
    setUsageValue(option); // Update the combined state
    updateSelections(option);
  };

  const handleUsageChange = (event) => {
    const newValue = event.target.value;
    setUsageValue(newValue); // Update the combined state with the typed value
    updateSelections(newValue);
  };

  // Helper function to update global selections state
  const updateSelections = (newValue) => {
    const updatedSelections = [...selections];
    updatedSelections[currentPage] = newValue;
    setSelections(updatedSelections);
  };

  return (
    <div className={styles.container}>
      <h1>
        How do you primarily use <span className={styles[color]}>{app}</span>?{" "}
      </h1>
      <TextField
        id="standard-textarea"
        multiline
        variant="outlined"
        label="Type your usage here..."
        fullWidth
        value={typeof usageValue === "string" ? usageValue : ""} // Ensure only string values are passed to TextField
        onChange={handleUsageChange}
      />
      <div className={styles.commonLabel}>
        Or, choose one of these common usages:
      </div>
      <div className={styles.groupContainer}>
        {usageOptions.map((option) => (
          <TextBox
            key={option}
            text={option}
            isSelected={usageValue === option}
            onSelect={handleSelection}
          />
        ))}
      </div>
    </div>
  );
};

export default Usage;
