import { React, useEffect, useState } from "react";
import styles from "./Finalize.module.scss";

const Finalize = ({ selections, setSelections, currentPage }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [reframe, setReframe] = useState(selections[currentPage - 1]);
  const [textAreaValue, setTextAreaValue] = useState(reframe);

  const editConfirmClick = () => {
    if (isEditable) {
      setReframe(textAreaValue);
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  const cancelClick = () => {
    setIsEditable(false);
    setTextAreaValue(reframe);
  };

  useEffect(() => {
    if (isEditable) {
      let selectionsCopy = [...selections];
      selectionsCopy[currentPage] = null;
      setSelections(selectionsCopy);
    } else {
      let selectionsCopy = [...selections];
      selectionsCopy[currentPage] = reframe;
      setSelections(selectionsCopy);
    }
  }, [isEditable, reframe]);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>You're almost there!</h1>
        <div className={styles.subHeader}>
          You have successfully completed the reframe process. Here is the
          reframe you have chosen:
        </div>
        <div className={styles.editContainer}>
          <textarea
            className={styles["reframe-textarea"]}
            value={textAreaValue}
            disabled={!isEditable}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
          />
          <div className="flex flex-row gap-2 self-start">
            <button
              className={styles.button + " " + styles.buttonEdit}
              onClick={editConfirmClick}
            >
              {isEditable ? "Confirm" : "Edit"}
            </button>
            {isEditable && (
              <button
                className={styles.button + " " + styles.buttonCancel}
                onClick={cancelClick}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.headingContainer}>
        <div className={styles.subHeader}>
          Get more help with the reframe (optional):
        </div>
        <div className={styles.helpContainer}>
          <div>I would like to...</div>
        </div>
      </div>
    </div>
  );
};

export default Finalize;
