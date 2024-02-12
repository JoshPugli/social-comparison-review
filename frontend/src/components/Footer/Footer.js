import React from "react";
import styles from "./Footer.module.scss";
import { Icon } from "@iconify/react";

const Footer = ({ onBack, onForward, canContinue, canGoBack }) => {
  return (
    <div className={styles.footer}>
      <button
        className={`${styles.button} ${styles.backButton}`}
        onClick={onBack}
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
        Continue
        <span
          className={`${styles.icon} ${styles.forwardIcon}`}
          disabled={!canGoBack}
        >
          <Icon icon="ph:arrow-right-bold" />
        </span>
      </button>
    </div>
  );
};

export default Footer;
