import React from "react";
import styles from "./End.module.scss"; // Ensure the correct path is used for the CSS module
import Lottie from "react-lottie";
import animationData from "../../assets/animations/Animation - 1711487741365.json";

const End = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.container}>
        <div className={styles.content}>
      <Lottie options={defaultOptions} height={400} width={400} />
      <div className={styles.header}>Thank you for completing the survey</div>
      </div>
    </div>
  );
};

export default End;
