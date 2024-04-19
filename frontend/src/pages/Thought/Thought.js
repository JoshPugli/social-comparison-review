import React, { useState } from "react";
import styles from "./Thought.module.scss";
import { thoughts } from "../../assets/constants";
import TextBox from "../../components/TextBox/TextBox";
import TextField from "@material-ui/core/TextField";

const Thought = ({ selections, setSelections, currentPage }) => {
  const [inputValue, setInputValue] = useState(selections[currentPage] || "");

  const handleInputValueChange = (newValue) => {
    setInputValue(newValue); 
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
        variant="outlined" 
        fullWidth
        value={typeof inputValue === "string" ? inputValue : ""} 
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
