import React, { useState } from "react";
import styles from "./Situation.module.scss";
import { platforms, thoughts, useStyles } from "../../assets/constants";
import TextBox from "../../components/TextBox/TextBox";
import TextField from "@material-ui/core/TextField";

const Situation = ({ selections, setSelections, currentPage }) => {
  // Combine the thought and selectedThought states into one to synchronize their values
  const [inputValue, setInputValue] = useState(selections[currentPage] || "");
  // let color = platforms.find((platform) => platform.name === app).colorClass;

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
      <h1>
        What's a recent situation that led to you think: <span className={styles.thought}>"{selections[1]}"</span>?
      </h1>
      <div className={styles.subheader}>
        For example, if your negative thought is "No one cares about me," the
        situation might be "My friend never texted me back."
      </div>
      <TextField
        id="standard-textarea"
        label="Explain the situation here..."
        multiline
        variant="outlined"
        fullWidth
        value={typeof inputValue === "string" ? inputValue : ""}
        onChange={handleTextFieldChange}
      />
    </div>
  );
};

export default Situation;
