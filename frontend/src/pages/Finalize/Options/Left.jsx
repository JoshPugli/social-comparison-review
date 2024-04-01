import { React } from "react";
import styles from "./Options.module.scss";

const Left = ({
    isEditable,
    setIsEditable,
    selections,
    reframe,
    setReframe,
    textAreaValue,
    setTextAreaValue,
  }) => {
  return (
    <div className={styles.container}>
      <h1>Left!</h1>
    </div>
  );
};

export default Left;
