import { React, useEffect, useState } from "react";
import styles from "./Options.module.scss";

const Left = ({
  setScrollValue,
  selections,
  reframe,
  setReframe,
  textAreaValue,
  setTextAreaValue,
  setActiveIndex,
}) => {
  const [inputValue, setInputValue] = useState(reframe);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditConfirm = () => {
    if (!isEditable) {
      setIsEditable(true);
    } else {
      setReframe(inputValue);
      setScrollValue(true);
      setIsEditable(false);
      setActiveIndex(1);
    }
  };

  const handleCancel = () => {
    setInputValue(reframe);
    setIsEditable(false);
  };

  useEffect(() => {
    if (isEditable) {
      setScrollValue(false);
    } else {
      setScrollValue(true);
    }
  }, [isEditable]);

  return (
    <div className={styles.container}>
      <div className={styles.editContainer}>
        <div className={styles.editText}>Your current reframed thought:</div>
        <textarea
          className={styles.textArea}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Type your custom reframe here"
          disabled={!isEditable}
        />
        <div className="flex-row">
          <button
            onClick={handleEditConfirm}
            className={`${styles.editButton} ${
              isEditable ? styles.selected : ""
            }`}
          >
            {isEditable ? "Confirm" : "Edit"}
          </button>
          <button
            className={`${styles.cancelButton} ${
              isEditable ? styles.selected : ""
            }`}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Left;
