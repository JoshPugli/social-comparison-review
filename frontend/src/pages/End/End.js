import React from "react";
import styles from "./End.module.scss"; // Ensure the correct path is used for the CSS module
import Lottie from "react-lottie";
import animationData from "../../assets/animations/Animation - 1711487741365.json";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const End = ({selections}) => {
  const handleRestart = () => {
    sessionStorage.clear(); // Clear the session storage
    window.location.reload();
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(selections, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ThoughtRecord.json";
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
              {selections[0]}
            </div>
            <div className={styles.selection}>
              <span className={styles.colored}>Emotion I felt:</span>{" "}
              {selections[1].emotion}
            </div>
            <div className={styles.selection}>
              <span className={styles.colored}>Situation I was in:</span>{" "}
              {selections[2]}
            </div>
            <div className={styles.selection}>
              <span className={styles.colored}>
                Thinking trap(s) I identified:
              </span>{" "}
              {selections[3].join(", ")}
            </div>
            <div className={styles.selection}>
              <span className={styles.colored}>Reframe I came up with:</span>{" "}
              {selections[5]}
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
