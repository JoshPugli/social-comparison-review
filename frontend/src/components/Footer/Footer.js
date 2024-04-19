import React from "react";
import styles from "./Footer.module.scss";
import { Icon } from "@iconify/react";

const Footer = ({ onBack, onForward, canContinue, canGoBack, currentPage }) => {
  const next_button_text = (() => {
    if (currentPage === 5) {
      return "Finalize";
    } else if (currentPage === 6) {
      return "Submit";
    } else {
      return "Continue";
    }
  })();

  return (
    <div className={styles.footer}>
      <button
        className={`${styles.button} ${styles.backButton}`}
        onClick={onBack}
        disabled={!canGoBack}
      >
        <span className={`${styles.icon} ${styles.backIcon}`}>
          <Icon icon="ph:arrow-left-bold" />
        </span>
        Back
      </button>
      <button
        className={`${styles.button} ${styles.forwardButton}`}
        onClick={onForward}
        disabled={!canContinue}
      >
        {next_button_text}
        <span className={`${styles.icon} ${styles.forwardIcon}`}>
          <Icon icon="ph:arrow-right-bold" />
        </span>
      </button>
    </div>
  );
};

export default Footer;
