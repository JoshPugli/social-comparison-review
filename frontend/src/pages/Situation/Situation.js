import React, { useState } from "react";
import styles from "./Situation.module.scss";
import { platforms, thoughts, useStyles } from "../../assets/variables";
import TextBox from "../../components/TextBox/TextBox";
import TextField from "@material-ui/core/TextField";

const Situation = ({ selections, setSelections, currentPage, app }) => {
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
        What's a recent situation when using{" "}
         that led to this negative
        thought?
      </h1>
      <div className={styles.subheader}>
        Think about a moment while using that made you feel
        negatively. Was it seeing someone's post that made you feel badly? Or
        perhaps a particularily negative comment or discussion?
        Describe the event as specifically as you can.
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
