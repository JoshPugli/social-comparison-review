import React, { useState } from "react";
import styles from "./Thought.module.scss";
import { platforms, thoughts, useStyles } from "../../assets/constants";
import TextBox from "../../components/TextBox/TextBox";
import TextField from "@material-ui/core/TextField";

const Thought = ({ selections, setSelections, currentPage, app }) => {
  // Combine the thought and selectedThought states into one to synchronize their values
  const [inputValue, setInputValue] = useState(selections[currentPage] || "");
  // let color = platforms.find((platform) => platform.name === app).colorClass;

  const handleInputValueChange = (newValue) => {
    setInputValue(newValue); // Update the combined state
    // Update the selections state for the current page
    const updatedSelections = [...selections];
    updatedSelections[currentPage] = newValue;
    setSelections(updatedSelections);
  };

  const handleTextFieldChange = (event) => {
    handleInputValueChange(event.target.value);
  };

  const handleSelection = (option) => {
    handleInputValueChange(option);
  };

  return (
    <div className={styles.container}>
      <h1>What negative thought are you struggling with right now?</h1>
      <TextField
        id="standard-textarea"
        label="Type your thought here..."
        multiline
        variant="outlined" // Changed to 'outlined' for better visibility
        fullWidth
        value={typeof inputValue === "string" ? inputValue : ""} // TextField expects a string, ensure compatibility
        onChange={handleTextFieldChange}
      />
      <div className={styles.commonLabel}>
        Or, choose one of these common thoughts to work on:
      </div>
      <div className={styles.groupContainer}>
        {thoughts.map((thoughtOption) => (
          <TextBox
            key={thoughtOption}
            text={thoughtOption}
            isSelected={inputValue === thoughtOption}
            onSelect={handleSelection}
          />
        ))}
      </div>
    </div>
  );
};

export default Thought;
