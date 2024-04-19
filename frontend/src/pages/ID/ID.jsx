import React, { useState } from "react";
import styles from "./ID.module.scss";
import TextField from "@material-ui/core/TextField";

const ID = ({ selections, setSelections, currentPage }) => {
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

  return (
    <div className={styles.container}>
      <h1>Please enter your ID before continuing</h1>
      <TextField
        id="standard-textarea"
        label="Enter your ID here..."
        multiline
        variant="outlined"
        fullWidth
        value={typeof inputValue === "string" ? inputValue : ""}
        onChange={handleTextFieldChange}
      />
    </div>
  );
};

export default ID;
