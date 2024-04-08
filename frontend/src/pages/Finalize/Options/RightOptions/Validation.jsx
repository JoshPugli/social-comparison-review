import { React } from "react";
import styles from "./RightOption.module.scss";

const Validation = ({ getNewReframe }) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() =>
          getNewReframe(
            "I would like my reframe to provide support and validate my feelings."
          )
        }
      >
        Generate an Updated Reframe
      </button>
    </div>
  );
};

export default Validation;
