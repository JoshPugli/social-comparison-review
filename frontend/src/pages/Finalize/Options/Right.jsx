import { React } from "react";
import styles from "./Options.module.scss";

const Right = ({
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
      <h1>Right!</h1>
    </div>
  );
};

export default Right;
