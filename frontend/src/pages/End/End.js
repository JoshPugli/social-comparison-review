import React from "react";
import styles from "./End.module.scss"; // Ensure the correct path is used for the CSS module
import { Icon } from "@iconify/react";

const End = ({selections}) => {
  const handleRestart = () => {
    sessionStorage.clear(); // Clear the session storage
    window.location.reload();
  };

  const handleDownload = () => {
    let dataStr = `Negative thought I had: ${selections[1]}\n`;
    dataStr += `Emotion I felt: ${selections[2].emotion}\n`;
    dataStr += `Situation I was in: ${selections[3]}\n`;
    dataStr += `Thinking trap(s) I identified: ${selections[4].join(", ")}\n`;
    dataStr += `Reframe I came up with: ${selections[6]}\n`;
  
    const blob = new Blob([dataStr], { type: "text/plain" });
  
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "ThoughtRecord.txt";  
    link.click();
  
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
        <div className={styles.header}>
          Let's look back at what you came up with:
        </div>
        <div className={styles.content}>
          <div className={styles.selections}>
            <div className={styles.selection}>
              <span className={styles.colored}>Negative thought I had:</span>{" "}
              {selections[1]}
            </div>
            <div className={styles.selection}>
              <span className={styles.colored}>Emotion I felt:</span>{" "}
              {selections[2].emotion}
            </div>
            <div className={styles.selection}>
              <span className={styles.colored}>Situation I was in:</span>{" "}
              {selections[3]}
            </div>
            <div className={styles.selection}>
              <span className={styles.colored}>
                Thinking trap(s) I identified:
              </span>{" "}
              {selections[4].join(", ")}
            </div>
            <div className={styles.selection}>
              <span className={styles.colored}>Reframe I came up with:</span>{" "}
              {selections[6]}
            </div>
          </div>
        </div>
        <button className={styles.downloadButton} onClick={handleDownload}>
          Download Thought Record
        </button>
      </div>

      <button className={styles.tryAgain} onClick={handleRestart}>
        <Icon style={{ marginRight: "5px" }} icon="iconamoon:restart-bold" />{" "}
        Try this activity again
      </button>
    </div>
  );
};

export default End;
