import { React } from "react";
import styles from "./RightOption.module.scss";

const NextSteps = ({ getNewReframe }) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() =>
          getNewReframe(
            "I would like help identifying next steps and actions to take moving forward, in an overall manner. Respond in 1-4 sentences."
          )
        }
      >
        Generate an Updated Reframe
      </button>
    </div>
  );
};

export default NextSteps;
